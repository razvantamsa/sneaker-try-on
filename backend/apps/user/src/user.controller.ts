import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { User } from 'apps/common/models/user';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('healthcheck')
  healthCheck() {
    return 'User microservice is working...';
  }

  @MessagePattern({ cmd: 'get_user' })
  getUser({ userId }): User {
    return this.userService.getUser(userId);
  }

  @MessagePattern({ cmd: 'get_users' })
  getUsers(): User[] {
    return this.userService.getUsers();
  }

  @MessagePattern({ cmd: 'create_user' })
  createUser({ createUserDto }): User {
    return this.userService.createUser(createUserDto);
  }

  @MessagePattern({ cmd: 'update_user' })
  updateUser({ userId, updateUserDto }): User {
    return this.userService.updateUser(userId, updateUserDto);
  }

  @MessagePattern({ cmd: 'delete_user' })
  deleteUser({ userId }): User {
    return this.userService.deleteUser(userId);
  }
}
