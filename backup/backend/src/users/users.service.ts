import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { MailerService } from "@nestjs-modules/mailer";
import { MoreThan, Repository } from "typeorm";
import { isNil, not } from "ramda";
import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { isEmpty } from "lodash";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";

import { JwtPayload } from "../common/interfaces/jwt-payload.interface";

import { UpdateUserInput } from "./input/update.input";
import { Tokens } from "./input/tokens.input";
import { ResetPasswordToken } from "./input/resetPassword.input";

import { UserModel } from "./models/user.model";

@Injectable()
export class UsersService {
  constructor(
    @InjectPinoLogger(UsersService.name)
    private readonly logger: PinoLogger,
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService
  ) {}

  async getById(id: string): Promise<UserModel> {
    return await this.userRepository.findOne({ where: { id: id } });
  }

  async getByEmail(email: string): Promise<UserModel> {
    return await this.userRepository
      .createQueryBuilder()
      .where("LOWER(email) = LOWER(:email)", { email })
      .getOne();
  }

  async getByRefreshToken(refreshToken: string): Promise<UserModel> {
    return await this.userRepository.findOne({
      where: { refreshToken },
    });
  }

  async list(): Promise<UserModel[]> {
    return await this.userRepository
      .createQueryBuilder("user")
      .orderBy("created_at", "DESC")
      .getMany();
  }

  async findByEmail(email: string): Promise<UserModel> {
    return await this.userRepository.findOne({
      where: { email: email, isActive: true },
    });
  }

  async validateUser(payload: JwtPayload): Promise<UserModel> {
    return await this.getById(payload.id.toString());
  }

  async activate(activationKey: string): Promise<UserModel> {
    const expirationDate = new Date();
    expirationDate.setDate(
      expirationDate.getDate() -
        parseInt(this.configService.get("USER_ACTIVATION_EXPIRE_DAYS"))
    );

    const user = await this.userRepository.findOne({
      where: {
        activationKey,
        createdAt: MoreThan(expirationDate),
      },
    });

    if (!user) {
      return null;
    }

    user.isMember = true;

    const savedUser = await this.userRepository.save(user);
    return savedUser;
  }

  async resetToken(user: UserModel): Promise<ResetPasswordToken> {
    const resetToken = this.createToken(
      { id: user.id },
      this.configService.get<string>("JWT_RESETPASS_TOKEN_SECRET"),
      this.configService.get("JWT_RESETPASS_TOKEN_EXPIRY")
    );

    return { resetToken };
  }

  async generateResetToken(email: string): Promise<ResetPasswordToken> {
    const user = await this.getByEmail(email);

    if (!user) {
      return null;
    }

    const { resetToken } = await this.resetToken(user);

    const encodedToken = Buffer.from(String(resetToken), "binary").toString(
      "base64"
    );

    try {
      await this.mailerService.sendMail({
        to: user.email,
        from: this.configService.get("MAIL_NOREPLY"),
        subject: "Password reset request for you Hey Lady! account",
        template: "resetpass.ejs",
        context: {
          resetPassURL: `${this.configService.get<string>(
            "FRONTEND_URL"
          )}/auth/create-password/${encodedToken}`,
          firstName: user.firstName,
        },
      });
    } catch (error) {
      this.logger.error(
        { error, user },
        "Failed to send email for password reset"
      );
    }

    return { resetToken };
  }

  async resetPassword(
    resetToken: string,
    newPassword: string
  ): Promise<UserModel> {
    const buff = Buffer.from(resetToken, "base64");
    const decodedResetToken = buff.toString("ascii");
    let user = null;

    try {
      const decodedToken = jwt.verify(
        decodedResetToken,
        this.configService.get<string>("JWT_RESETPASS_TOKEN_SECRET")
      );
      // eslint-disable-next-line @typescript-eslint/dot-notation
      user = await this.userRepository.findOne({ id: decodedToken["id"] });
    } catch {
      return null;
    }

    if (!user) {
      throw new HttpException("Email not found", HttpStatus.BAD_REQUEST);
    }

    user.meta = isNil(user.meta) ? { banned: false } : user.meta;

    await user.setPassword(newPassword); // TODO: Check for invalid password
    if (not(user.isActive) && not(user.meta.banned)) {
      try {
        await this.mailerService.sendMail({
          to: user.email,
          from: this.configService.get("MAIL_NOREPLY"),
          subject: "[KEEP THIS!] Your login information for Hey Lady! platform",
          template: "welcome.ejs",
          context: {
            email: user.email,
            firstName: user.firstName,
          },
        });
      } catch (error) {
        this.logger.error(
          { error, user },
          "Failed to send email for reset password"
        );
      }
    }
    user.isActive = true && not(user.meta.banned);
    await this.userRepository.save(user);

    return await this.getById(user.id);
  }

  async generateTokens(user: UserModel): Promise<Tokens> {
    const payload = { id: user.id };

    const accessToken = this.createToken(
      payload,
      `${this.configService.get<string>("JWT_ACCESS_TOKEN_SECRET")}-${
        user.email
      }-${user.password}`,
      this.configService.get("JWT_ACCESS_TOKEN_EXPIRY")
    );

    if (!user.refreshToken) {
      const refreshToken = this.createToken(
        payload,
        `${this.configService.get<string>("JWT_REFRESH_TOKEN_SECRET")}-${
          user.email
        }-${user.password}`,
        null
      );

      user.refreshToken = refreshToken;
      await this.userRepository.save(user);
    }

    return {
      accessToken,
      refreshToken: user.refreshToken,
    };
  }

  async createBare(
    email: string,
    firstName?: string,
    lastName?: string
  ): Promise<UserModel> {
    const existingUser = await this.getByEmail(email);

    const user = isNil(existingUser) ? new UserModel() : existingUser;

    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
    user.password = Date.now().toString();

    const savedUser = await this.userRepository.save(user);

    const { resetToken } = await this.resetToken(user);

    const encodedToken = Buffer.from(String(resetToken), "binary").toString(
      "base64"
    );

    try {
      await this.mailerService.sendMail({
        to: user.email,
        from: this.configService.get("MAIL_NOREPLY"),
        subject: "[IMPORTANT] Please set your password",
        template: "createPassword.ejs",
        context: {
          resetPassURL: `${this.configService.get<string>(
            "FRONTEND_URL"
          )}/auth/create-password/${encodedToken}`,
          email: user.email,
          firstName: user.firstName,
        },
      });
    } catch (error) {
      this.logger.error(
        { error, user },
        "Failed to send email to create password"
      );
    }

    return savedUser;
  }

  async register(email: string, password: string): Promise<UserModel> {
    const duplicate = await this.userRepository.findOne({
      where: { email: email },
    });

    if (duplicate) {
      throw new HttpException("Email already taken", HttpStatus.CONFLICT);
    }

    if (password === undefined) password = "";

    const user = new UserModel();
    user.password = password;
    user.email = email;
    user.activationKey = this.generateActivationKey();

    this.mailerService
      .sendMail({
        to: user.email,
        from: this.configService.get("MAIL_NOREPLY"),
        subject: "Activate your account",
        template: "register.ejs",
        context: {
          activationURL: `${this.configService.get<string>(
            "FRONTEND_URL"
          )}/onboard/activate/${user.activationKey}`,
        },
      })
      .catch((error) => {
        this.logger.error(
          { error, user },
          "Failed to send email for activation of the account"
        );
      });

    const registeredUser = await this.userRepository.save(user);

    return registeredUser;
  }

  async updatePassword(
    user: UserModel,
    currentPassword: string,
    newPassword: string
  ): Promise<UserModel> {
    const isValid = await bcrypt.compare(currentPassword, user.password);
    if (!isValid) {
      return null;
    }

    await user.setPassword(newPassword);

    const updated = await this.userRepository.update(
      { id: user.id },
      { password: user.password }
    );
    if (!updated) {
      return null;
    }

    return await this.getById(user.id);
  }

  async login(email: string, password: string): Promise<UserModel> {
    if (password === "") {
      throw new HttpException("Empty password", HttpStatus.BAD_REQUEST);
    }

    const user = await this.userRepository
      .createQueryBuilder()
      .where("LOWER(email) = LOWER(:email)", { email })
      .getOne();
    if (!user) {
      return null;
    }

    if (not(user.isMember)) {
      throw new HttpException(
        "Ops, the current user is not active. Please activate your account by clicking the activation link from your email.",
        HttpStatus.BAD_REQUEST
      );
    }

    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : null;
  }

  async update(
    updateUser: UpdateUserInput,
    userID: string
  ): Promise<UserModel> {
    const result = await this.userRepository.update(userID, { ...updateUser });

    if (isNil(result) || isEmpty(result)) {
      return null;
    }

    const user = await this.getById(userID);

    return await this.userRepository.save(user);
  }

  createToken(
    payload: JwtPayload,
    secret: string,
    expiresIn: string | null
  ): any {
    const options = expiresIn === null ? {} : { expiresIn };

    return jwt.sign(payload, secret, options);
  }

  generateActivationKey(): string {
    return crypto.randomBytes(20).toString("hex");
  }
}
