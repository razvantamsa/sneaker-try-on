import { Get } from "@nestjs/common";
import { UserModel } from "./models/user.model";

export class UserController {
  @Get()
  async getUsers() {
    console.log("getUsers");
  }
}
