import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { User } from './user.entity'
import { UserCreateInput } from './dto/user.input'

const users = [
  {
    id: '1',
    name: 'Aさん'
  },
  {
    id: '2',
    name: 'Bさん'
  }
]

@Resolver('User')
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    return users
  }

  @Mutation(() => User)
  async createUser(@Args('param') param: UserCreateInput): Promise<User> {
    return { id: 'aaaa', name: param.name }
  }
}
