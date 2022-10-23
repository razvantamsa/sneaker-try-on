import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from 'apps/common/dto/create-user.dto';
import { UpdateUserDto } from 'apps/common/dto/update-user.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UserService {
  private logger;
  constructor(@Inject('USERS') private readonly userClient: ClientProxy) {
    this.logger = new Logger();
  }

  public getUser(userId: string) {
    this.logger.log(`Fetching user ${userId}...`);
    return this.userClient.send({ cmd: 'get_user' }, { userId });
  }

  public getUsers() {
    this.logger.log(`Fetching all users...`);
    return this.userClient.send({ cmd: 'get_users' }, {});
  }

  public createUser(createUserDto: CreateUserDto) {
    this.logger.log(`Creating user...`);

    return this.userClient.send({ cmd: 'create_user' }, { createUserDto });
  }

  public updateUser(userId: string, updateUserDto: UpdateUserDto) {
    this.logger.log(`Updating user ${userId}...`);

    return this.userClient.send(
      { cmd: 'update_user' },
      { userId, updateUserDto },
    );
  }

  public deleteUser(userId: string) {
    this.logger.log(`Deleting user ${userId}...`);

    return this.userClient.send({ cmd: 'update_user' }, { userId });
  }
}
