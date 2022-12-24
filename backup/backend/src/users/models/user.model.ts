import { Field, ObjectType } from "@nestjs/graphql";
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import * as bcrypt from "bcrypt";

import { DeckModel } from "../../decks/models/deck.model";

@ObjectType()
@Entity({ name: "users" })
export class UserModel {
  @Field({ nullable: false })
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field({ nullable: true })
  @Column("varchar", { length: 255, name: "first_name", nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  @Column("varchar", { length: 255, name: "last_name", nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  @Column("varchar", { length: 255, name: "email", nullable: true })
  email?: string;

  @Column("varchar", { length: 255 })
  password: string;

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
  @Column("varchar", { length: 255, name: "profile_picture", nullable: true })
  profilePic?: string;

  @Field({ nullable: true })
  @Column("boolean", { name: "is_member", nullable: true })
  isMember?: boolean;

  @Field({ nullable: true })
  @Column("varchar", { length: 255, name: "activation_key", nullable: true })
  activationKey?: string;

  @Field({ nullable: true })
  @Column("varchar", { length: 255, name: "refresh_token", nullable: true })
  refreshToken?: string;

  // Associations

  @OneToMany(() => DeckModel, (deck) => deck.user, {
    cascade: true,
  })
  decks: DeckModel[];

  @BeforeInsert()
  async setPassword(password: string): Promise<void> {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }
}
