/* eslint-env jest */
import createReducer from '../createReducer'

describe('createReducer', () => {
  it('creates a reducer which uses the passed in state', () => {
    const inputState = {
      index: 1,
      routes: [{ key: 'route0' }]
    }
    const reducer = createReducer(inputState)
    const outputState = reducer(undefined, { type: 'FAKE' })

    expect(outputState).toEqual(inputState)
  })

  it('defaults to an empty navigation state', () => {
    const reducer = createReducer()
    const outputState = reducer(undefined, { type: 'FAKE' })
    const defaultState = {
      index: 0,
      routes: []
    }
    expect(outputState).toEqual(defaultState)
  })
})
