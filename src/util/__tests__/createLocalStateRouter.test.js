/* eslint-env jest */
import createLocalStateRouter from '../createLocalStateRouter'

describe('createLocalStateRouter', () => {
  const mockResolve = jest.fn()
  const mockScope = {
    state: { navigation: { index: 0, routes: [] } },
    setState: jest.fn()
  }

  afterEach(() => jest.resetAllMocks())

  it('creates a router', () => {
    const router = createLocalStateRouter(mockResolve, mockScope)
    const expected = expect.objectContaining({
      resolve: expect.any(Function),
      push: expect.any(Function),
      pop: expect.any(Function),
      reset: expect.any(Function)
    })
    expect(router).toEqual(expected)
  })

  it('dispatches pop actions', () => {
    const router = createLocalStateRouter(mockResolve, mockScope)
    router.pop()
    expect(mockScope.setState).toHaveBeenCalled()
  })

  it('dispatches push actions', () => {
    const router = createLocalStateRouter(mockResolve, mockScope)
    router.push('foo')
    expect(mockScope.setState).toHaveBeenCalled()
  })

  it('dispatches reset actions', () => {
    const router = createLocalStateRouter(mockResolve, mockScope)
    router.reset('foo')
    expect(mockScope.setState).toHaveBeenCalled()
  })

  it('returns the resolve function', () => {
    const router = createLocalStateRouter(mockResolve, mockScope)
    router.resolve('foo')
    expect(mockResolve).toHaveBeenCalledWith('foo')
  })
})
