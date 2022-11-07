import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserDto {
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

  @Field()
  avatarUrl?: string;

  @Field()
  isAdmin?: boolean;
}
