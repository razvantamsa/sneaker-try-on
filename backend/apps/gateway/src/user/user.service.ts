import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { User } from 'apps/common/models/user';
import { CreateUserDto } from 'apps/common/dto/create-user.dto';
import { UpdateUserDto } from 'apps/common/dto/update-user.dto';

@Injectable()
export class UserService {
  private users: User[] = [];

  private logger;
  constructor() {
    this.logger = new Logger();
  }

  public getUser(userId: string): User {
    this.logger.log(`Fetching user ${userId}...`);
    return this.users.find((entry) => entry.userId === userId);
  }

  public getUsers(): User[] {
    this.logger.log(`Fetching all users...`);
    return this.users;
  }

  public createUser({ email, password }: CreateUserDto): User {
    this.logger.log(`Creating user...`);

    const newUser = new User(uuidv4(), email, password, false);
    this.users.push(newUser);
    return newUser;
  }

  public updateUser(userId: string, updateUserDto: UpdateUserDto): User {
    this.logger.log(`Updating user ${userId}...`);

    const user = this.users.find((entry) => entry.userId === userId);
    Object.assign(user, updateUserDto);
    return user;
  }

  public deleteUser(userId: string): User {
    this.logger.log(`Deleting user ${userId}...`);
    const userIndex = this.users.findIndex((user) => user.userId === userId);
    const user = this.users[userIndex];
    this.users.splice(userIndex);
    return user;
  }
}
