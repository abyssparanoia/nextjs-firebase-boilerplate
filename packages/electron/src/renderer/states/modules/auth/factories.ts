import { faker, toArray } from '../../test-utils'
import { User } from '@abyssparanoia/interface'

const user = (): User => ({
  id: faker.random.uuid(),
  role: 'admin',
  disabled: faker.random.boolean(),
  createdAt: faker.random.number(),
  updatedAt: faker.random.number()
})

export const factories = {
  userList: toArray(user, 30, 30)
}
