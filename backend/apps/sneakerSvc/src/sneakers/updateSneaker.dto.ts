import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateSneakerDto {
  @Field({ nullable: true })
  name?: string;
}
