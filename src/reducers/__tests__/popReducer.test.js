/* eslint-env jest */
import reducer from '../popReducer'

describe('popReducer', () => {
  const inputState = Object.freeze({
    index: 1,
    routes: [{ key: 'route0' }, { key: 'route1' }]
  })
  const outputState = {
    index: 0,
    routes: [{ key: 'route0' }]
  }
  it('pops a route off the stack', () => {
    expect(reducer(inputState)).toEqual(outputState)
  })
})
