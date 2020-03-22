import { httpClient } from '../'

describe('clinet/index', () => {
  window.fetch = jest.fn().mockResolvedValue({
    ok: true
  }) as any
  describe('get', () => {
    test('success', async () => {
      const spy = jest.spyOn(window, 'fetch')
      const queryOrBody = { param: 'param' }
      await httpClient('get', '/path', queryOrBody)
      expect(spy).toHaveBeenCalled()
    })
  })

  describe('post', () => {
    test('success', async () => {
      const spy = jest.spyOn(window, 'fetch')
      const queryOrBody = { param: 'param' }
      await httpClient('post', '/path', queryOrBody)
      expect(spy).toHaveBeenCalled()
    })
  })

  describe('put', () => {
    test('success', async () => {
      const spy = jest.spyOn(window, 'fetch')
      const queryOrBody = { param: 'param' }
      await httpClient('put', '/path', queryOrBody)
      expect(spy).toHaveBeenCalled()
    })
  })

  describe('patch', () => {
    test('success', async () => {
      const spy = jest.spyOn(window, 'fetch')
      const queryOrBody = { param: 'param' }
      await httpClient('patch', '/path', queryOrBody)
      expect(spy).toHaveBeenCalled()
    })
  })

  describe('delete', () => {
    test('success', async () => {
      const spy = jest.spyOn(window, 'fetch')
      const queryOrBody = { param: 'param' }
      await httpClient('delete', '/path', queryOrBody)
      expect(spy).toHaveBeenCalled()
    })
  })
})
