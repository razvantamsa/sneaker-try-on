import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SneakerModel {
  @Field()
  id: string;

  @Field()
  name?: string;

  @Field()
  brandId: string;
}
