import { Inject, Logger } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

import { UserModel } from '../../../userSvc/src/users/user.model';

import { CreateUserDto } from '../../../userSvc/src/users/createUser.dto';
import { UpdateUserDto } from '../../../userSvc/src/users/updateUser.dto';

@Resolver((of) => UserModel)
export class UsersResolver {
  constructor(
    @Inject('USERS') private readonly userClient: ClientProxy,
    private readonly logger: Logger,
  ) {}

  @Query((returns) => UserModel)
  getUser(@Args('userId') userId: string) {
    this.logger.log(`Fetching user ${userId}...`);
    return this.userClient.send({ cmd: 'get_user' }, { userId });
  }

  @Query((returns) => [UserModel])
  getUsers() {
    console.log('ajung aicea');
    this.logger.log(`Fetching all users...`);

    return this.userClient.send({ cmd: 'get_users' }, {});
  }

  @Mutation((returns) => UserModel)
  createUser(@Args('createUserDto') createUserDto: CreateUserDto) {
    this.logger.log(`Creating user...`);
    return this.userClient.send({ cmd: 'create_user' }, { createUserDto });
  }

  @Mutation((returns) => UserModel)
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

  @Mutation((returns) => UserModel)
  deleteUser(@Args('userId') userId: string) {
    this.logger.log(`Deleting user ${userId}...`);
    return this.userClient.send({ cmd: 'update_user' }, { userId });
  }
}
