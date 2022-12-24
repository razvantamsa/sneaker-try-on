import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getManager, Repository } from "typeorm";
import { isEmpty, isNil, not } from "ramda";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";

import { CreateCardInput } from "./input/createCard.input";

import { EditCardInput } from "./input/editCard.input";

import { CardModel } from "./models/card.model";

@Injectable()
export class CardsService {
  constructor(
    @InjectPinoLogger(CardsService.name)
    private readonly logger: PinoLogger,
    @InjectRepository(CardModel)
    private readonly cardRepository: Repository<CardModel>
  ) {}

  async listByDeckId(deckId: string): Promise<CardModel[]> {
    return await this.cardRepository.find({ where: { deckId } });
  }

  async getById(id: string): Promise<CardModel> {
    return await this.cardRepository.findOne({ where: { id } });
  }

  async getCardCount(deckId: string): Promise<number> {
    return await this.cardRepository.count({ where: { deckId } });
  }

  async getAccuracy(deckId: string): Promise<number> {
    const percentage = 100;
    const outOf = 5;

    const result = await this.cardRepository
      .createQueryBuilder("cards")
      .select("sum(cards.accuracy) as score")
      .where("cards.deckId = :deckId", { deckId })
      .getRawOne();

    if (result) {
      return ((result?.score / result?.total) * percentage) / outOf;
    }

    return 0;
  }

  async createCard(createData: CreateCardInput): Promise<CardModel> {
    return await this.cardRepository.save(createData);
  }

  async editCard(editData: EditCardInput): Promise<CardModel> {
    return await this.cardRepository.save(editData);
  }

  async deleteCardsByDeckId(deckId: string): Promise<boolean> {
    const deletedCards = await this.cardRepository.delete({ deckId });
    return not(isNil(deletedCards) || isEmpty(deletedCards));
  }

  async deleteCard(id: string): Promise<boolean> {
    const deletedCard = await this.cardRepository.delete({ id });
    return not(isNil(deletedCard) || isEmpty(deletedCard));
  }
}
