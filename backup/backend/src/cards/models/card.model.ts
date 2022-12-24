import { Field, ObjectType } from "@nestjs/graphql";
import graphqlTypeJson from "graphql-type-json";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { DeckModel } from "../../decks/models/deck.model";

@ObjectType()
@Entity({ name: "cards" })
export class CardModel {
  @Field({ nullable: false })
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true, name: "deck_id" })
  deckId: string;

  @Field({ nullable: false })
  @CreateDateColumn({
    type: "timestamp with time zone",
    default: () => "CURRENT_TIMESTAMP(6)",
    name: "created_at",
  })
  createdAt: Date;

  @Field({ nullable: false })
  @UpdateDateColumn({
    type: "timestamp with time zone",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
    name: "updated_at",
  })
  updatedAt: Date;

  @Field((type) => graphqlTypeJson, { nullable: true })
  @Column("json", { name: "word", nullable: true })
  word?: any;

  @Field({ nullable: true })
  @Column("varchar", { length: 255, name: "photo", nullable: true })
  photo?: string;

  @Field({ nullable: true })
  @Column("varchar", { length: 255, name: "audio", nullable: true })
  audio?: string;

  @Field({ nullable: true })
  @Column("int", { name: "rating", nullable: true })
  rating?: number;

  @Field({ nullable: true })
  @Column("timestamp", { nullable: true, name: "last_seen" })
  lastSeen?: Date;

  @Field(() => DeckModel)
  @ManyToOne(() => DeckModel, (deck) => deck.cards)
  @JoinColumn({ name: "deck_id" })
  deck: DeckModel;
}
