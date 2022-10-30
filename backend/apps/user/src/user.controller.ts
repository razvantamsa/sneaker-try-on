import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserDto } from 'apps/common/dto/createUser.dto';
import { UserModel } from 'apps/common/models/userModel';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('healthcheck')
  healthCheck() {
    return 'User microservice is working...';
  }

  @MessagePattern({ cmd: 'get_user' })
  async getUser({ userId }): Promise<UserModel> {
    return this.userService.getUser(userId);
  }

  @MessagePattern({ cmd: 'get_users' })
  async getUsers(): Promise<UserModel[]> {
    return this.userService.getAllUsers();
  }

  @MessagePattern({ cmd: 'create_user' })
  async createUser(createUserDto: CreateUserDto): Promise<UserModel> {
    return this.userService.createUser(createUserDto);
  }

  @MessagePattern({ cmd: 'update_user' })
  async updateUser({ userId, updateUserDto }): Promise<UserModel> {
    return this.userService.updateUser({ userId, updateUserDto });
  }

  @MessagePattern({ cmd: 'delete_user' })
  async deleteUser({ userId }): Promise<UserModel> {
    return this.userService.deleteUser(userId);
  }
}
