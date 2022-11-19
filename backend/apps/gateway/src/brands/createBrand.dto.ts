import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBrandDto {
  @Field({ nullable: true })
  name?: string;
}
