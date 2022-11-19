import { HttpException, HttpStatus, Inject, Logger } from '@nestjs/common';
import {
  Args,
  Context,
  GraphQLExecutionContext,
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import { ActivateUserInput } from './activateUser.dto';

import { CreateUserDto } from './createUsers.dto';
import { Tokens } from './tokens.dto';
import { UpdateUserDto } from './updateUsers.dto';
import { UserModel } from './user.model';

@Resolver((of) => UserModel)
export class UsersResolver {
  constructor(
    @Inject('USERS') private readonly userClient: ClientProxy,
    private readonly logger: Logger,
  ) {}

  @Query(() => UserModel)
  getUser(@Args('userId') userId: string) {
    this.logger.log(`Fetching user ${userId}...`);

    return this.userClient.send({ cmd: 'get_user' }, userId);
  }

  @Query(() => [UserModel])
  getUsers() {
    console.log('ajung aicea');
    this.logger.log(`Fetching all users...`);
    console.log('ajung in resolver');
    return this.userClient.send({ cmd: 'get_users' }, {});
  }

  @Mutation(() => UserModel, { nullable: true })
  createUser(@Args('createUserDto') createUserDto: CreateUserDto) {
    this.logger.log(`Creating user...`);
    return this.userClient.send({ cmd: 'create_user' }, createUserDto);
  }

  @Mutation(() => UserModel)
  updateUser(
    @Args('userId') userId: string,
    @Args('updateUserDto') updateUserDto: UpdateUserDto,
  ) {
    this.logger.log(`Updating user ${userId}...`);
    return this.userClient.send(
      { cmd: 'update_user' },
      { userId, updateUserDto },
    );
  }

  @Mutation(() => UserModel)
  deleteUser(@Args('userId') userId: string) {
    this.logger.log(`Deleting user ${userId}...`);
    return this.userClient.send({ cmd: 'update_user' }, userId);
  }
}
