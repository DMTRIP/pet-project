import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { CreateUserInput } from './createUser.input';
import { UpdateUserInput } from './updateUser.input';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User, { name: 'user' })
  getUser(@Args('id') id: ID) {
    return this.userService.getUserById(id);
  }

  @Mutation(() => User)
  createUser(@Args('createUserInput') input: CreateUserInput) {
    return this.userService.createUser(input);
  }

  @Mutation(() => User)
  updateUser(
    @Args('id') id: ID,
    @Args('updateUserInput') input: UpdateUserInput,
  ) {
    return this.userService.updateUser(id, input);
  }

  @Mutation(() => User)
  deleteUser(@Args('id') id: ID) {
    return this.userService.deleteUser(id);
  }
}
