import navigationStackReducer from '../reducers/navigationStackReducer'
import createRouter from './createRouter'

/**
 * Create a router which emulates the standard redux router, but operates within the scope of a stateful component
 * rather than within a redux store
 * @param resolve a resolve function
 * @param scope the scope of the parent component, used to resolve state and setState
 * @param key the state key where the navigation state resides
 * @returns {{ resolve, pop, push, reset }}
 */
const createLocalStateRouter = (resolve, scope, key = 'navigation') => {
  const dispatch = action => {
    const state = scope.state[key]
    scope.setState({
      [key]: navigationStackReducer(state, action)
    })
  }
  return createRouter(dispatch, resolve)
}

export default createLocalStateRouter
