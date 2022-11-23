import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateBrandDto {
  @Field({ nullable: true })
  name?: string;
}
