export const RESET = 'RESET'

/**
 * Returns an FSA describing resetting the stack and replacing it with a particular route
 * @returns {{type: string, payload: *}}
 * @param key The route to reset to
 * @param params optional route parameters
 */
export const resetAction = (key, params) => {
  return {
    type: RESET,
    payload: { key, params }
  }
}
