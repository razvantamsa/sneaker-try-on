import { GraphQLJSON } from 'graphql-type-json';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserModel {
  @Field()
  id: string;

  @Field()
  firstName?: string;

  @Field()
  lastName?: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  wantsNewsletter?: boolean;

  @Field(() => GraphQLJSON, { nullable: true })
  meta?: any;

  @Field()
  avatarUrl?: string;

  @Field()
  isAdmin?: boolean;
}
