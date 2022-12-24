import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { isEmpty, isNil, not } from "ramda";

import { GqlAuthGuard } from "../users/gqlauthguard";
import { MutationStatus } from "../constants";
import { GenericResponseType } from "../common/types/generic-response.type";

import { CreateCardInput } from "./input/createCard.input";
import { EditCardInput } from "./input/editCard.input";

import { CardModel } from "./models/card.model";

import { CardsService } from "./cards.service";

@Resolver((of) => CardModel)
export class CardsResolver {
  constructor(
    @InjectPinoLogger(CardsResolver.name)
    private readonly logger: PinoLogger,
    private readonly cardsService: CardsService
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query((returns) => [CardModel], { name: "listByDeckId", nullable: true })
  async listByDeckId(@Args("deckId") deckId: string): Promise<CardModel[]> {
    return await this.cardsService.listByDeckId(deckId);
  }

  @UseGuards(GqlAuthGuard)
  @Query((returns) => CardModel, { name: "getById", nullable: true })
  async getById(@Args("id") id: string): Promise<CardModel> {
    return await this.cardsService.getById(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => CardModel, { name: "createCard", nullable: true })
  async createCard(
    @Args("createCardInput") createCardInput: CreateCardInput
  ): Promise<CardModel> {
    return await this.cardsService.createCard(createCardInput);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => CardModel, { name: "editCard", nullable: true })
  async editCard(
    @Args("editCardInput") editCardInput: EditCardInput
  ): Promise<CardModel> {
    return await this.cardsService.editCard(editCardInput);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => GenericResponseType, {
    name: "deleteCardsByDeckId",
    nullable: true,
  })
  async deleteCards(
    @Args("deckId") deckId: string
  ): Promise<GenericResponseType> {
    const result = await this.cardsService.deleteCardsByDeckId(deckId);

    return {
      status: not(isNil(result) || isEmpty(result))
        ? MutationStatus.SUCCESS
        : MutationStatus.FAILED,
    };
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => GenericResponseType, {
    name: "deleteCard",
    nullable: true,
  })
  async deleteCard(@Args("id") id: string): Promise<GenericResponseType> {
    const result = await this.cardsService.deleteCard(id);

    return {
      status: not(isNil(result) || isEmpty(result))
        ? MutationStatus.SUCCESS
        : MutationStatus.FAILED,
    };
  }
}
