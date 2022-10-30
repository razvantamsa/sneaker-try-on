import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from 'apps/common/dto/createUser.dto';
import { v4 as uuidv4 } from 'uuid';
import { UserModel } from 'apps/common/models/userModel';
import { UpdateUserClientDto } from 'apps/common/dto/updateUserClient.dto';
@Injectable()
export class UserService {
  private logger: Logger;

  private users: UserModel[] = [];

  constructor() {
    // private readonly userRepository: Repository<UserModel>, // @InjectRepository(UserModel)
    this.logger = new Logger();
  }

  async getUser(userId: string): Promise<UserModel> {
    this.logger.log(`Fetching user ${userId}...`);
    // return this.userRepository.findOne({ where: { userId } });
    return this.users.find((entry) => entry.userId === userId);
  }

  async getAllUsers(): Promise<UserModel[]> {
    this.logger.log(`Fetching all users...`);
    // return this.userRepository.find();
    return this.users;
  }

  async createUser({ email, password }: CreateUserDto): Promise<UserModel> {
    this.logger.log(`Creating user...`);

    const newUser = new UserModel(uuidv4(), email, password, false);
    // await this.userRepository.save(newUser);
    // return newUser;

    this.users.push(newUser);
    return newUser;
  }

  async updateUser({
    userId,
    updateUserDto,
  }: UpdateUserClientDto): Promise<UserModel> {
    this.logger.log(`Updating user ${userId}...`);

    // const user = await this.getUser(userId);
    // await this.userRepository.update(userId, updateUserDto);
    return this.users.find((entry) => entry.userId === userId);

    // return user;
  }

  async deleteUser(userId: string): Promise<UserModel> {
    this.logger.log(`Deleting user ${userId}...`);
    const deletedUser = await this.getUser(userId);
    // await this.userRepository.delete(userId);
    return this.users.find((entry) => entry.userId === userId);

    // return deletedUser;
  }
}
