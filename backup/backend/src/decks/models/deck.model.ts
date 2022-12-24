import { Field, ObjectType } from "@nestjs/graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { Languages } from "./../../constants";

import { UserModel } from "../../users/models/user.model";
import { CardModel } from "../../cards/models/card.model";

@ObjectType()
@Entity({ name: "decks" })
export class DeckModel {
  @Field({ nullable: false })
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true, name: "user_id" })
  userId: string;

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

  @Field({ nullable: true })
  @Column("varchar", { length: 255, name: "name", nullable: true })
  name?: string;

  @Field(() => Languages, { nullable: true })
  @Column({ type: "enum", enum: Languages, name: "language", nullable: true })
  language?: Languages;

  // Associations
  @ManyToOne(() => UserModel, (user) => user.decks)
  @JoinColumn({ name: "user_id" })
  user: UserModel;

  @OneToMany(() => CardModel, (card) => card.deck, {
    cascade: true,
  })
  cards: CardModel[];
}
