import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { isEmpty, isNil, not } from "ramda";

import { GqlAuthGuard } from "./../users/gqlauthguard";
import { MutationStatus } from "../constants";
import { GenericResponseType } from "../common/types/generic-response.type";

import { CreateDeckInput } from "./input/createDeck.input";
import { EditDeckInput } from "./input/editDeck.input";

import { User as CurrentUser } from "./../users/users.decorator";
import { UserModel } from "./../users/models/user.model";
import { DeckModel } from "./models/deck.model";

import { DecksService } from "./decks.service";
import { CardsService } from "./../cards/cards.service";

@Resolver((of) => DeckModel)
export class DecksResolver {
  constructor(
    @InjectPinoLogger(DecksResolver.name)
    private readonly logger: PinoLogger,
    private readonly decksService: DecksService,
    private readonly cardsService: CardsService
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query((returns) => [DeckModel], { name: "listByUserId", nullable: true })
  async listByUserId(@CurrentUser() user: UserModel): Promise<DeckModel[]> {
    return await this.decksService.listByUserId(user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Query((returns) => DeckModel, { name: "getById", nullable: true })
  async getById(@Args("id") id: string): Promise<DeckModel> {
    return await this.decksService.getById(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => DeckModel, { name: "createDeck", nullable: true })
  async createDeck(
    @Args("createDeckInput") createDeckInput: CreateDeckInput
  ): Promise<DeckModel> {
    return await this.decksService.createDeck(createDeckInput);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => DeckModel, { name: "editDeck", nullable: true })
  async editDeck(
    @Args("editDeckInput") editDeckInput: EditDeckInput
  ): Promise<DeckModel> {
    return await this.decksService.editDeck(editDeckInput);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => GenericResponseType, {
    name: "deleteDecksByUserId",
    nullable: true,
  })
  async deleteDecks(
    @CurrentUser() user: UserModel
  ): Promise<GenericResponseType> {
    const result = await this.decksService.deleteDecksByUserId(user.id);

    return {
      status: not(isNil(result) || isEmpty(result))
        ? MutationStatus.SUCCESS
        : MutationStatus.FAILED,
    };
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => GenericResponseType, {
    name: "deleteDeck",
    nullable: true,
  })
  async deleteDeck(@Args("id") id: string): Promise<GenericResponseType> {
    const result = await this.decksService.deleteDeck(id);

    return {
      status: not(isNil(result) || isEmpty(result))
        ? MutationStatus.SUCCESS
        : MutationStatus.FAILED,
    };
  }

  @ResolveField((returns) => Number, { name: "decks", nullable: true })
  async getCardsCount(@Args("id") id: string): Promise<number> {
    return await this.cardsService.getCardCount(id);
  }

  @ResolveField((returns) => Number, { name: "decks", nullable: true })
  async getAccuracy(@Args("id") id: string): Promise<number> {
    return await this.cardsService.getAccuracy(id);
  }
}
