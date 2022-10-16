import { Query, Resolver } from "@nestjs/graphql";

import { UserModel } from "./models/user.model";

// import { UsersService } from "./users.service";

@Resolver((of) => UserModel)
export class UsersResolver {
  constructor() // private readonly usersService: UsersService,

  {}

  @Query(() => String)
  sayHello(): string {
    return "Hello World";
  }
}
