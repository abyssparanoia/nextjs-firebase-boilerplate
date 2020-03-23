import { Resolver, Query } from '@nestjs/graphql'
import { User } from './user.entity'

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
}
