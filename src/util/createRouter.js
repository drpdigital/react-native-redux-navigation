import { popAction } from '../actions/popAction'
import { pushAction } from '../actions/pushAction'
import { resetAction } from '../actions/resetAction'

export default (dispatch, resolve) => {
  return {
    resolve,
    pop: () => dispatch(popAction()),
    push: (route, params) => dispatch(pushAction(route, params)),
    reset: (route, params) => dispatch(resetAction(route, params))
  }
}
