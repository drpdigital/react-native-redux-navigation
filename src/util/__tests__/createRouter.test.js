/* eslint-env jest */
import createRouter from '../createRouter'
import { popAction } from '../../actions/popAction'
import { pushAction } from '../../actions/pushAction'
import { resetAction } from '../../actions/resetAction'

describe('createRouter', () => {
  const mockResolve = jest.fn()
  const mockDispatch = jest.fn()

  afterEach(() => jest.resetAllMocks())

  it('creates a router', () => {
    const router = createRouter(mockDispatch, mockResolve)
    const expected = expect.objectContaining({
      resolve: expect.any(Function),
      push: expect.any(Function),
      pop: expect.any(Function),
      reset: expect.any(Function)
    })
    expect(router).toEqual(expected)
  })

  it('dispatches pop actions', () => {
    const router = createRouter(mockDispatch, mockResolve)
    const action = popAction()
    router.pop()
    expect(mockDispatch).toHaveBeenCalledWith(action)
  })

  it('dispatches push actions', () => {
    const router = createRouter(mockDispatch, mockResolve)
    const action = pushAction('foo')
    router.push('foo')
    expect(mockDispatch).toHaveBeenCalledWith(action)
  })

  it('dispatches reset actions', () => {
    const router = createRouter(mockDispatch, mockResolve)
    const action = resetAction('foo')
    router.reset('foo')
    expect(mockDispatch).toHaveBeenCalledWith(action)
  })

  it('returns the resolve function', () => {
    const router = createRouter(mockDispatch, mockResolve)
    router.resolve('foo')
    expect(mockResolve).toHaveBeenCalledWith('foo')
  })
})
