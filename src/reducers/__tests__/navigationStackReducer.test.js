/* eslint-env jest */
import reducer from '../navigationStackReducer'
import { pushAction } from '../../actions/pushAction'
import { popAction } from '../../actions/popAction'
import { resetAction } from '../../actions/resetAction'

jest.mock('../pushReducer')
jest.mock('../popReducer')
jest.mock('../resetReducer')

describe('navigationStackReducer', () => {
  it('handles push actions', () => {
    const mockReducer = require('../pushReducer').default
    const state = { index: 0, routes: [{ key: 'foo' }] }
    const action = pushAction('bar')
    reducer(state, action)
    expect(mockReducer).toHaveBeenCalledWith(state, action)
  })

  it('handles pop actions', () => {
    const mockReducer = require('../popReducer').default
    const state = { index: 0, routes: [{ key: 'foo' }] }
    const action = popAction()
    reducer(state, action)
    expect(mockReducer).toHaveBeenCalledWith(state)
  })

  it('handles reset actions', () => {
    const mockReducer = require('../resetReducer').default
    const state = { index: 0, routes: [{ key: 'foo' }] }
    const action = resetAction('bar')
    reducer(state, action)
    expect(mockReducer).toHaveBeenCalledWith(state, action)
  })
})
