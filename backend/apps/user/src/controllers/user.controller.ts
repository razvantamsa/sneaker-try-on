import { ClientProxy } from '@nestjs/microservices';
import { Controller, Inject, Logger } from '@nestjs/common';

import { CreateUserDto } from '../interfaces/createUser.dto';
import { UpdateUserDto } from '../interfaces/updateUser.dto';

@Controller()
export class UserController {
  private logger: Logger;

  constructor(@Inject('USERS') private readonly userClient: ClientProxy) {
    this.logger = new Logger();
  }

  getUser(userId: string) {
    this.logger.log(`Fetching user ${userId}...`);
    return this.userClient.send({ cmd: 'get_user' }, { userId });
  }

  getUsers() {
    this.logger.log(`Fetching all users...`);
    return this.userClient.send({ cmd: 'get_users' }, {});
  }

  createUser(createUserDto: CreateUserDto) {
    this.logger.log(`Creating user...`);
    return this.userClient.send({ cmd: 'create_user' }, { createUserDto });
  }

  updateUser(userId: string, updateUserDto: UpdateUserDto) {
    this.logger.log(`Updating user ${userId}...`);
    return this.userClient.send(
      { cmd: 'update_user' },
      { userId, updateUserDto },
    );
  }

  deleteUser(userId: string) {
    this.logger.log(`Deleting user ${userId}...`);
    return this.userClient.send({ cmd: 'update_user' }, { userId });
  }
}
