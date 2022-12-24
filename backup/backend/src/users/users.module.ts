import { PinoLogger } from "nestjs-pino";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigService, ConfigModule } from "@nestjs/config";

import { CommonModule } from "../common/common.module";

import { UserModel } from "./models/user.model";
import { DeckModel } from "../decks/models/deck.model";

import { UsersService } from "./users.service";
import { DecksService } from "../decks/decks.service";

import { UsersResolver } from "./users.resolver";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserModel, DeckModel]),
    CommonModule,
    ConfigModule,
  ],
  providers: [UsersResolver, ConfigService, UsersService, DecksService],
  exports: [TypeOrmModule.forFeature([UserModel]), UsersService],
})
export class UsersModule {}
