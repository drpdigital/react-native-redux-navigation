import { PUSH } from '../actions/pushAction'
import { POP } from '../actions/popAction'
import { RESET } from '../actions/resetAction'
import pushReducer from './pushReducer'
import popReducer from './popReducer'
import resetReducer from './resetReducer'

// default initial state
const initialState = {
  index: 0,
  routes: []
}

export default function navigationStackReducer (state = initialState, action) {
  switch (action.type) {
    case PUSH: return pushReducer(state, action)
    case POP: return popReducer(state)
    case RESET: return resetReducer(state, action)
    default: return state
  }
}
