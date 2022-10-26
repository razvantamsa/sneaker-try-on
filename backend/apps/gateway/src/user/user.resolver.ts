import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CreateUserDto } from 'apps/common/dto/createUser.dto';
import { UpdateUserDto } from 'apps/common/dto/updateUser.dto';
import { User } from 'apps/common/models/userModel';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User, { name: 'user', nullable: true })
  getUser(@Args('userId') userId: string) {
    return this.userService.getUser(userId);
  }

  @Query(() => [User], { name: 'users', nullable: true })
  getUsers() {
    return this.userService.getUsers();
  }

  @Mutation(() => User)
  createUser(@Args('createUserDto') createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Mutation(() => User)
  updateUser(
    @Args('userId') userId: string,
    @Args('updateUserDto') updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(userId, updateUserDto);
  }

  @Mutation(() => User)
  deleteUser(@Args('userId') userId: string) {
    return this.userService.deleteUser(userId);
  }
}
