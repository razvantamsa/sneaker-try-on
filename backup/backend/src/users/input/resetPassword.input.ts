import { Field, InputType, ObjectType } from "@nestjs/graphql";

@InputType()
export class ResetPasswordInput {
  @Field()
  newPassword: string;

  @Field()
  resetToken: string;
}

@InputType()
export class UpdatePasswordInput {
  @Field({ nullable: false })
  currentPassword: string;

  @Field({ nullable: false })
  newPassword: string;
}

@ObjectType()
export class ResetPasswordToken {
  @Field({ nullable: false })
  resetToken?: string;
}

@InputType()
export class RequestPasswordInput {
  @Field()
  email: string;
}
