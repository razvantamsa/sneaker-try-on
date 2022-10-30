import { Inject, Logger } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from 'apps/common/dto/createUser.dto';
import { UpdateUserDto } from 'apps/common/dto/updateUser.dto';
import { UserModel } from 'apps/common/models/userModel';

@Resolver()
export class UserResolver {
  private logger;

  constructor(@Inject('USERS') private readonly userClient: ClientProxy) {
    this.logger = new Logger();
  }

  @Query(() => UserModel, { name: 'user', nullable: true })
  getUser(@Args('userId') userId: string) {
    this.logger.log(`Fetching user ${userId}...`);
    return this.userClient.send({ cmd: 'get_user' }, { userId });
  }

  @Query(() => [UserModel], { name: 'users', nullable: true })
  getUsers() {
    this.logger.log(`Fetching all users...`);
    return this.userClient.send({ cmd: 'get_users' }, {});
  }

  @Mutation(() => UserModel)
  createUser(@Args('createUserDto') createUserDto: CreateUserDto) {
    this.logger.log(`Creating user...`);
    return this.userClient.send({ cmd: 'create_user' }, { createUserDto });
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
    return this.userClient.send({ cmd: 'update_user' }, { userId });
  }
}
