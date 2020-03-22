import faker from 'faker'

// fix seed
faker.seed(123)

const times = <T>(n: number, cb: () => T): T[] => {
  const result: T[] = []
  for (let index = 0; index < n; index++) {
    result.push(cb())
  }
  return result
}

export const toArray = <T>(cb: () => T, min = 1, max = 5): T[] => {
  return times(faker.random.number({ min, max }), cb)
}

export const deepCopy = <T>(base: T): T => JSON.parse(JSON.stringify(base))
export { faker }
