import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigService, ConfigModule } from "@nestjs/config";

import { CardModel } from "./models/card.model";

import { CommonModule } from "../common/common.module";

import { CardsResolver } from "./cards.resolver";
import { CardsService } from "./cards.service";

@Module({
  imports: [TypeOrmModule.forFeature([CardModel]), CommonModule, ConfigModule],
  providers: [ConfigService, CardsResolver, CardsService],
  exports: [TypeOrmModule.forFeature([CardModel]), CardsService],
})
export class CardsModule {}
