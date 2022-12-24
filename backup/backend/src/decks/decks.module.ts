import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigService, ConfigModule } from "@nestjs/config";

import { DeckModel } from "./models/deck.model";
import { CardModel } from "../cards/models/card.model";

import { CommonModule } from "../common/common.module";

import { DecksService } from "./decks.service";
import { CardsService } from "../cards/cards.service";

import { DecksResolver } from "./decks.resolver";
@Module({
  imports: [
    TypeOrmModule.forFeature([DeckModel, CardModel]),
    CommonModule,
    ConfigModule,
  ],
  providers: [DecksResolver, ConfigService, DecksService, CardsService],
  exports: [TypeOrmModule.forFeature([DeckModel]), DecksService],
})
export class DecksModule {}
