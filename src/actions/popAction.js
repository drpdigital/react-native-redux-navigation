export const POP = 'POP'

/**
 * Returns an FSA describing popping the top route off the stack
 * @returns {{type: string }}
 */
export const popAction = () => ({ type: POP })
