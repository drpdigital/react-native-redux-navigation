/* eslint-env jest */
import reducer from '../popReducer'

describe('popReducer', () => {
  it('pops the top route off the stack', () => {
    const inputState = Object.freeze({
      index: 1,
      routes: Object.freeze([{ key: 'route0' }, { key: 'route1' }])
    })
    const outputState = {
      index: 0,
      routes: [{ key: 'route0' }]
    }
    expect(reducer(inputState)).toEqual(outputState)
  })
  it('never leaves the stack with no routes', () => {
    const inputState = Object.freeze({
      index: 0,
      routes: Object.freeze([{ key: 'route0' }])
    })
    expect(reducer(inputState)).toEqual(inputState)
  })
})
