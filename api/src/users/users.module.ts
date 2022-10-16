import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigService, ConfigModule } from "@nestjs/config";

import { UserModel } from "./models/user.model";
import { UserPhotoModel } from "./models/photo.model";
import { UserSettingsModel } from "./models/settings.model";
import { CommonModule } from "../common/common.module";

import { UsersResolver } from "./users.resolver";
@Module({
  imports: [
    TypeOrmModule.forFeature([UserModel]),
    TypeOrmModule.forFeature([UserPhotoModel]),
    TypeOrmModule.forFeature([UserSettingsModel]),
    CommonModule,
    ConfigModule
  ],
  providers: [UsersResolver, ConfigService],
  exports: [TypeOrmModule.forFeature([UserModel])]
})
export class UsersModule {}
