import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';

import { UserModel } from './user.model';

import { CreateUserDto } from './createUser.dto';
import { UpdateUserDto } from './updateUser.dto';

@Injectable()
export class UsersService {
  private logger: Logger;

  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
  ) {
    this.logger = new Logger();
  }

  async getUser(id: string): Promise<UserModel> {
    this.logger.log(`Fetching user ${id}...`);
    return await this.userRepository.findOne({ where: { id } });
  }

  async getAllUsers(): Promise<UserModel[]> {
    this.logger.log(`Fetching all users...`);
    return await this.userRepository.find();
  }

  async createUser(createUser: CreateUserDto): Promise<UserModel> {
    this.logger.log(`Creating user...`);

    const newUser = new UserModel();

    newUser.firstName = createUser.firstName;
    newUser.lastName = createUser.lastName;
    newUser.email = createUser.email;
    newUser.password = createUser.password;

    return await this.userRepository.save(newUser);
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserModel> {
    this.logger.log(`Updating user ${id}...`);

    const user = await this.getUser(id);
    await this.userRepository.update(id, { ...updateUserDto });
    return user;
  }

  async deleteUser(id: string): Promise<UserModel> {
    this.logger.log(`Deleting user ${id}...`);
    const deletedUser = await this.getUser(id);
    await this.userRepository.delete(id);
    return deletedUser;
  }
}
