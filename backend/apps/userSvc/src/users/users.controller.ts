import { MessagePattern } from '@nestjs/microservices';
import { Controller, Logger } from '@nestjs/common';

import { UserModel } from './user.model';

import { CreateUserDto } from './createUser.dto';

import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly logger: Logger,
  ) {}

  @MessagePattern({ cmd: 'get_user' })
  async getUser(userId: string): Promise<UserModel> {
    this.logger.log(`Fetching user ${userId}...`);
    return await this.usersService.getUser(userId);
  }

  @MessagePattern({ cmd: 'get_users' })
  async getUsers(): Promise<UserModel[]> {
    this.logger.log(`Fetching all users...`);
    return await this.usersService.getAllUsers();
  }

  @MessagePattern({ cmd: 'create_user' })
  async createUser(createUserDto: CreateUserDto): Promise<UserModel> {
    this.logger.log(`Creating user...`);
    return await this.usersService.createUser(createUserDto);
  }

  @MessagePattern({ cmd: 'update_user' })
  async updateUser({ userId, updateUserDto }): Promise<UserModel> {
    this.logger.log(`Updating user ${userId}...`);
    return await await this.usersService.updateUser(userId, updateUserDto);
  }

  @MessagePattern({ cmd: 'delete_user' })
  async deleteUser(userId: string): Promise<UserModel> {
    this.logger.log(`Deleting user ${userId}...`);
    return await this.usersService.deleteUser(userId);
  }
}
