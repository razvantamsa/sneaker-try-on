import { Field, ObjectType } from "@nestjs/graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { UserModel } from "./user.model";

@ObjectType()
@Entity({ name: "user_photos" })
export class UserPhotoModel {
  @Field({ nullable: false })
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "user_id" })
  userID: string;

  @Field(() => UserModel)
  @ManyToOne(() => UserModel, (user) => user.photos, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: UserModel;

  @Field({ nullable: false })
  @Column("text")
  url: string;

  @Field({ nullable: false })
  @CreateDateColumn({
    type: "timestamp with time zone",
    default: () => "CURRENT_TIMESTAMP(6)",
    name: "created_at"
  })
  createdAt: Date;

  @Field({ nullable: false })
  @UpdateDateColumn({
    type: "timestamp with time zone",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
    name: "updated_at"
  })
  updatedAt: Date;
}
