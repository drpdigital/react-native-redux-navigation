export const RESET = 'RESET'

/**
 * Returns an FSA describing resetting the stack and replacing it with a particular route
 * @returns {{type: string, payload: *}}
 * @param route
 */
export const resetAction = route => {
  route = typeof route === 'string' ? { key: route } : route
  return {
    type: RESET,
    payload: { route }
  }
}
