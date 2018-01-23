export const PUSH = 'PUSH'

/**
 * Returns an FSA describing pushing a route to the stack
 * @returns {{type: string, payload: *}}
 * @param route
 */
export const pushAction = route => {
  route = typeof route === 'string' ? { key: route } : route
  return {
    type: PUSH,
    payload: { route }
  }
}
