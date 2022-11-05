import { Logger } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MessagePattern } from '@nestjs/microservices';

import { UserModel } from '../models/user.model';

import { CreateUserDto } from '../interfaces/createUser.dto';
import { UpdateUserDto } from '../interfaces/updateUser.dto';

import { UserService } from '../services/user.service';

@Resolver((of) => UserModel)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly logger: Logger,
  ) {}

  @MessagePattern({ cmd: 'get_user' })
  @Query((returns) => UserModel)
  async getUser(@Args('userId') userId: string): Promise<UserModel> {
    this.logger.log(`Fetching user ${userId}...`);
    return await this.userService.getUser(userId);
  }

  @MessagePattern({ cmd: 'get_users' })
  @Query((returns) => UserModel)
  async getUsers(): Promise<UserModel[]> {
    this.logger.log(`Fetching all users...`);
    return await this.userService.getAllUsers();
  }

  @MessagePattern({ cmd: 'create_user' })
  @Mutation((returns) => UserModel, { name: 'createUser', nullable: true })
  async createUser(
    @Args('createUserDto') createUserDto: CreateUserDto,
  ): Promise<UserModel> {
    this.logger.log(`Creating user...`);
    return await this.userService.createUser(createUserDto);
  }

  @MessagePattern({ cmd: 'update_user' })
  @Mutation((returns) => UserModel, { name: 'updateUser', nullable: true })
  async updateUser(
    @Args('userId') userId: string,
    @Args('updateUserDto') updateUserDto: UpdateUserDto,
  ): Promise<UserModel> {
    this.logger.log(`Updating user ${userId}...`);
    return await await this.userService.updateUser(userId, updateUserDto);
  }

  @MessagePattern({ cmd: 'delete_user' })
  @Mutation((returns) => UserModel, { name: 'deleteUser', nullable: true })
  async deleteUser(@Args('userId') userId: string): Promise<UserModel> {
    this.logger.log(`Deleting user ${userId}...`);
    return await this.userService.deleteUser(userId);
  }
}
