/* eslint-env jest */
import reducer from '../resetReducer'
import { resetAction } from "../../actions/resetAction"

describe('resetReducer', () => {
  const inputState = Object.freeze({
    index: 1,
    routes: Object.freeze([{ key: 'route0' }, { key: 'route1' }])
  })
  const outputState = {
    index: 0,
    routes: [{ key: 'route2' }]
  }
  const action = resetAction('route2')
  it('reset the stack to a single route', () => {
    expect(reducer(inputState, action)).toEqual(outputState)
  })
})
