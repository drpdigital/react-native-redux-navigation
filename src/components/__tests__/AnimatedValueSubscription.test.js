/* eslint-env jest */
import AnimatedValueSubscription from '../../AnimatedValueSubscription'

describe('AnimatedValueSubscription', () => {
  it('adds listener', () => {
    const mockAnimatedValue = {
      addListener: jest.fn(() => 'token'),
      removeListener: jest.fn()
    }
    const mockCallback = jest.fn()
    const subscription = new AnimatedValueSubscription(mockAnimatedValue, mockCallback)
    expect(subscription._token).toBe('token')
    expect(subscription._value).toBe(mockAnimatedValue)
    expect(mockAnimatedValue.addListener).toBeCalledWith(mockCallback)
  })

  it('removes listener', () => {
    const mockAnimatedValue = {
      addListener: jest.fn(),
      removeListener: jest.fn()
    }
    const mockCallback = jest.fn()
    const subscription = new AnimatedValueSubscription(mockAnimatedValue, mockCallback)
    subscription.remove()
    expect(mockAnimatedValue.removeListener).toBeCalledWith(subscription._token)
  })
})
