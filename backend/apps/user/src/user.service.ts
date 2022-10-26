import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from 'apps/common/dto/createUser.dto';
import { UpdateUserDto } from 'apps/common/dto/updateUser.dto';
import { v4 as uuidv4 } from 'uuid';
import { UserModel } from 'apps/common/models/userModel';

@Injectable()
export class UserService {
  private logger;

  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
  ) {
    this.logger = new Logger();
  }

  async getUser(userId: string): Promise<UserModel> {
    this.logger.log(`Fetching user ${userId}...`);
    return await this.userRepository.findOne({ userId });
  }

  async getAllUsers(): Promise<UserModel[]> {
    this.logger.log(`Fetching all users...`);
    return await this.userRepository.find();
  }

  async createUser({ email, password }: CreateUserDto): Promise<UserModel> {
    this.logger.log(`Creating user...`);

    const newUser = new UserModel(uuidv4(), email, password, false);
    await this.userRepository.save(newUser);
    return newUser;
  }

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserModel> {
    this.logger.log(`Updating user ${userId}...`);

    const user = await this.getUser(userId);
    await this.userRepository.update(userId, updateUserDto);
    return user;
  }

  async deleteUser(userId: string): Promise<UserModel> {
    this.logger.log(`Deleting user ${userId}...`);
    const deletedUser = await this.getUser(userId);
    await this.userRepository.delete(userId);
    return deletedUser;
  }
}
