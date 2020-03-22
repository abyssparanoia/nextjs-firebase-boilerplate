import queryString from 'query-string'
import { helpers } from '../get'

describe('get', () => {
  describe('removeNull', () => {
    test('success', async () => {
      const expected = [['param', 'param']]
      const queryOrBody = { param: 'param' }
      const result = helpers.removeNull(queryOrBody)
      expect(result).toEqual(expected)
    })
  })

  describe('toObject', () => {
    test('success', async () => {
      const expected = { param: 'param' }
      const array: [string, unknown][] = [['param', 'param']]
      const result = helpers.toObject(array)
      expect(result).toEqual(expected)
    })
  })

  describe('getQueryString', () => {
    test('success', async () => {
      const queryObj = { param: 'param' }
      const spy = jest.spyOn(queryString, 'stringify')
      helpers.getQueryString(queryObj)
      expect(spy).toHaveBeenCalled()
    })

    test('queryObj is blank', async () => {
      const queryObj = {}
      const expected = ''
      const result = helpers.getQueryString(queryObj)
      expect(result).toEqual(expected)
    })
  })
})
