import { faker, toArray } from '../../test-utils'

const errorMessage = (): string => faker.random.words()

export const factories = {
  errorMessageList: toArray(errorMessage)
}
