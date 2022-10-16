import { registerEnumType } from "@nestjs/graphql";

export enum UserKind {
  GUEST = "guest",
  User = "user"
}

registerEnumType(UserKind, {
  name: "UserKind"
});

export const allowedUserKind = Object(UserKind);

export enum Onboarding {
  NAME = "name",
  AVATAR = "avatar",
  COMPLETE = "complete"
}

registerEnumType(Onboarding, {
  name: "Onboarding"
});

export const allowedOnboarding = Object(Onboarding);
