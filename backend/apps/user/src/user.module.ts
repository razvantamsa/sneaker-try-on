import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from 'apps/common/models/userModel';
import { DataSource } from 'typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel]), DataSource],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
