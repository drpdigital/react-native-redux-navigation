/* eslint-env jest */
import reducer from '../pushReducer'
import {pushAction} from "../../actions/pushAction"

describe('pushReducer', () => {
  const inputState = Object.freeze({
    index: 0,
    routes: Object.freeze([{ key: 'route0' }])
  })
  const outputState = {
    index: 1,
    routes: [{ key: 'route0' }, { key: 'route1' }]
  }
  const action = pushAction('route1')
  it('pushes a route on to the stack', () => {
    expect(reducer(inputState, action)).toEqual(outputState)
  })
})
