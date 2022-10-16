import { Field, ObjectType } from "@nestjs/graphql";
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import * as bcrypt from "bcrypt";
import { isNil, not, reduce } from "ramda";
import { size, round, isEmpty, isNumber } from "lodash";
import graphqlTypeJson from "graphql-type-json";

import { Onboarding, UserKind } from "../../constants";

import { UserPhotoModel } from "./photo.model";
import { UserSettingsModel } from "./settings.model";
import { DeepFakePhotoModel } from "../../deepFakePhotos/models/deepFakePhoto.model";

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
  @Column("boolean")
  email: boolean;

  @Column("varchar", { length: 255 })
  password: string;

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

  @Field(() => graphqlTypeJson, { nullable: true })
  @Column("json", { nullable: true, name: "meta" })
  meta?: any;

  @Field(() => UserKind, { nullable: true })
  @Column("enum", {
    enum: UserKind,
    nullable: true,
    name: "kind",
    default: UserKind.GUEST
  })
  kind?: UserKind;

  @Field({ nullable: true })
  @Column("boolean", { default: false, name: "is_online" })
  isOnline?: boolean;

  @Field({ nullable: true })
  @Column("boolean", { default: false, nullable: true, name: "is_complete" })
  isComplete?: boolean;

  @Field({ nullable: true })
  @Column("boolean", { default: false, nullable: true, name: "wantsNewsletter" })
  wantsNewsletter?: boolean;

  @Field({ nullable: true })
  @Column("text", { nullable: true, name: "avatar_url" })
  avatarUrl?: string;

  @Field({ nullable: true })
  @Column("boolean", { default: false, nullable: true, name: "is_admin" })
  isAdmin?: boolean;

  @Field({ nullable: true })
  @Column("varchar", { length: 255, name: "activation_key", nullable: true })
  activationKey?: string;

  @Field({ nullable: true })
  @Column("varchar", { length: 255, name: "refresh_token", nullable: true })
  refreshToken?: string;

  @Field()
  get name(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @Field()
  get completedPercentage(): number {
    const toComplete = [this.lastName, this.firstName, this.avatarUrl];

    const completed = reduce((total, field) => (not(isEmpty(field)) ? total + 1 : total), 0, toComplete);

    return round((completed / size(toComplete)) * 100);
  }

  @Field(() => Onboarding)
  get onboarding(): Onboarding {
    const field = reduce(
      (acc, field) => (!isNil(acc) ? acc : !isNil(field[0]) && !isEmpty(field[0]) ? field[1] : null),
      null,
      [
        [this.lastName, Onboarding.NAME],
        [this.firstName, Onboarding.NAME],
        [this.avatarUrl, Onboarding.AVATAR]
      ]
    );

    return field || Onboarding.COMPLETE;
  }

  // Associations

  @OneToMany(() => DeepFakePhotoModel, (deepFakePhoto) => deepFakePhoto.user, {
    cascade: true
  })
  deepFakePhotos: DeepFakePhotoModel[];

  @Field(() => [UserPhotoModel])
  @OneToMany(() => UserPhotoModel, (photo) => photo.user, {
    cascade: true
  })
  photos: UserPhotoModel[];

  @OneToOne(() => UserSettingsModel, (settings) => settings.user, {
    cascade: true
  })
  settings: UserSettingsModel;

  @BeforeInsert()
  async setPassword(password: string): Promise<void> {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }

  shouldBeCompleted(): boolean {
    return reduce((result, field) => result && (not(isEmpty(field)) || isNumber(field)), true, [
      this.lastName,
      this.firstName,
      this.avatarUrl
    ]);
  }
}
