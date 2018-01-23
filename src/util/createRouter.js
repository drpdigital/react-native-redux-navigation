import { popAction } from '../actions/popAction'
import { pushAction } from '../actions/pushAction'
import { resetAction } from '../actions/resetAction'

export default (dispatch, resolve) => {
  return {
    resolve,
    pop: () => dispatch(popAction()),
    push: route => dispatch(pushAction(route)),
    reset: route => dispatch(resetAction(route))
  }
}
