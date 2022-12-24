import { Field, InputType } from "@nestjs/graphql";
import graphqlTypeJson from "graphql-type-json";
import { Any } from "../../common/scalars/any.scalar";

@InputType()
export class CreateCardInput {
  @Field((type) => graphqlTypeJson, { nullable: true })
  word?: any;

  @Field({ nullable: true })
  photo?: string;

  @Field({ nullable: true })
  audio?: string;

  @Field({ nullable: true })
  rating?: number;

  @Field({ nullable: true })
  lastSeen?: Date;
}
