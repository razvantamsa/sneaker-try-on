import { LanguageProg } from "./../constants";
import { HttpException, HttpStatus, UseGuards } from "@nestjs/common";
import {
  Args,
  Context,
  GraphQLExecutionContext,
  Mutation,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { GqlAuthGuard } from "./gqlauthguard";
import { MailerService } from "@nestjs-modules/mailer";
import { ConfigService } from "@nestjs/config";

import { MutationStatus } from "../constants";
import { GenericResponseType } from "../common/types/generic-response.type";

import { UpdateUserInput } from "./input/update.input";
import { ActivateUserInput } from "./input/activate.input";
import { Tokens } from "./input/tokens.input";
import { LoginInput } from "./input/login.input";
import {
  RequestPasswordInput,
  ResetPasswordInput,
  UpdatePasswordInput,
} from "./input/resetPassword.input";

import { User as CurrentUser } from "./users.decorator";
import { UserModel } from "./models/user.model";

import { UsersService } from "./users.service";
import { DecksService } from "../decks/decks.service";

@Resolver((of) => UserModel)
export class UsersResolver {
  constructor(
    @InjectPinoLogger(UsersResolver.name)
    private readonly logger: PinoLogger,
    private readonly usersService: UsersService,
    private readonly decksService: DecksService,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService
  ) {}

  @Mutation((returns) => Tokens, { name: "activateUser", nullable: true })
  async activateUser(
    @Context() ctx: GraphQLExecutionContext,
    @Args("input") activateData: ActivateUserInput
  ): Promise<Tokens> {
    const user = await this.usersService.activate(activateData.activationKey);

    if (!user) {
      throw new HttpException(
        "Invalid activation email link. Please contact us via email.",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    const { accessToken, refreshToken } =
      await this.usersService.generateTokens(user);
    ctx["res"].cookie("RefreshToken", refreshToken, { httpOnly: true }); // eslint-disable-line @typescript-eslint/dot-notation

    try {
      await this.mailerService.sendMail({
        to: user.email,
        from: this.configService.get("MAIL_NOREPLY"),
        subject: "Welcome to Hey Lady!",
        template: "welcome.ejs",
      });
    } catch (error) {
      this.logger.error({ error }, "Failed to send welcome email");
    }

    return {
      accessToken,
    };
  }

  @Mutation((returns) => Tokens, { name: "refreshToken", nullable: true })
  async refreshToken(@Context() ctx: GraphQLExecutionContext): Promise<Tokens> {
    const token = ctx["req"]?.cookies?.RefreshToken; // eslint-disable-line @typescript-eslint/dot-notation

    if (!token) {
      throw new HttpException(
        "Missing refresh token from cookie",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
    const user = await this.usersService.getByRefreshToken(token);

    if (!user) {
      throw new HttpException(
        "Error activating user. Try again!",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    const { accessToken, refreshToken } =
      await this.usersService.generateTokens(user);
    ctx["res"].cookie("RefreshToken", refreshToken, { httpOnly: true }); // eslint-disable-line @typescript-eslint/dot-notation

    return {
      accessToken,
    };
  }

  @Mutation((returns) => Tokens, { name: "login", nullable: true })
  async login(
    @Context() ctx: GraphQLExecutionContext,
    @Args("input") loginData: LoginInput
  ): Promise<Tokens> {
    const user = await this.usersService.login(
      loginData.email,
      loginData.password
    );
    if (!user) {
      throw new HttpException(
        "Incorrect email or password. Try again!",
        HttpStatus.NOT_FOUND
      );
    }

    const { accessToken, refreshToken } =
      await this.usersService.generateTokens(user);
    ctx["res"].cookie("RefreshToken", refreshToken, { httpOnly: true }); // eslint-disable-line @typescript-eslint/dot-notation

    return {
      accessToken,
    };
  }

  @UseGuards(GqlAuthGuard)
  @Query((returns) => UserModel)
  async me(@CurrentUser() user: UserModel): Promise<UserModel> {
    const currentUser = await this.usersService.getById(user.id);

    return currentUser;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => UserModel, { name: "updateMe", nullable: true })
  async updateMe(
    @CurrentUser() user: UserModel,
    @Args("input") updateData: UpdateUserInput
  ): Promise<UserModel> {
    return await this.usersService.update(updateData, user.id);
  }

  @Mutation((returns) => GenericResponseType, {
    name: "requestResetPassword",
    nullable: false,
  })
  async requestResetPassword(
    @Args("input") requestNewPass: RequestPasswordInput
  ): Promise<GenericResponseType> {
    const result = await this.usersService.generateResetToken(
      requestNewPass.email
    );

    return {
      status: result ? MutationStatus.SUCCESS : MutationStatus.FAILED,
    };
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => Tokens, { name: "updatePassword", nullable: false })
  async updatePassword(
    @Context() ctx: GraphQLExecutionContext,
    @Args("input") updatePassword: UpdatePasswordInput,
    @CurrentUser() me: UserModel
  ): Promise<Tokens> {
    const user = await this.usersService.updatePassword(
      me,
      updatePassword.currentPassword,
      updatePassword.newPassword
    );
    if (!user) {
      return null;
    }

    const { accessToken, refreshToken } =
      await this.usersService.generateTokens(user);
    ctx["res"].cookie("RefreshToken", refreshToken, { httpOnly: true }); // eslint-disable-line @typescript-eslint/dot-notation

    return {
      accessToken,
    };
  }

  @Mutation((returns) => GenericResponseType, {
    name: "resetPassword",
    nullable: true,
  })
  async resetPassword(
    @Args("input") resetPasswordInput: ResetPasswordInput
  ): Promise<GenericResponseType> {
    const result = await this.usersService.resetPassword(
      resetPasswordInput.resetToken,
      resetPasswordInput.newPassword
    );

    return {
      status: result ? MutationStatus.SUCCESS : MutationStatus.FAILED,
    };
  }

  @ResolveField((returns) => Number, { name: "me", nullable: true })
  async getLangsProg(@CurrentUser() user: UserModel): Promise<LanguageProg[]> {
    return await this.decksService.getLanguagesAccuracy(user.id);
  }
}
