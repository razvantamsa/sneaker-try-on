import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserModel {
  constructor(
    userId: string,
    email: string,
    password: string,
    isSubscribed: boolean,
  ) {
    this.userId = userId;
    this.email = email;
    this.password = password;
    this.isSubscribed = isSubscribed;
  }

  @Field()
  userId: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  isSubscribed?: boolean;
}
