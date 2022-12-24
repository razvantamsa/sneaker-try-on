import { Field, InputType } from "@nestjs/graphql";

import { Languages } from "../../constants";

@InputType()
export class EditDeckInput {
  @Field({ nullable: true })
  name?: string;

  @Field(() => Languages, { nullable: true })
  language?: Languages;
}
