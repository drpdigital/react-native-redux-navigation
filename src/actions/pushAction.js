export const PUSH = 'PUSH'

/**
 * Returns an FSA describing pushing a route to the stack
 * @returns {{type: string, payload: *}}
 * @param key The route to push to
 * @param params optional route parameters
 */
export const pushAction = (key, params) => {
  return {
    type: PUSH,
    payload: { key, params }
  }
}
