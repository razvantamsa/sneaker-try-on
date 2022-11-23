import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateSneakerDto {
  @Field()
  brandId: string;

  @Field({ nullable: true })
  name?: string;
}
