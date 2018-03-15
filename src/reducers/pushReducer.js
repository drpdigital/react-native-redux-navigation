export default function pushReducer (state, action) {
  const { key, params } = action.payload
  const routes = [ ...state.routes ]
  routes.push({ key, params })
  return {
    ...state,
    index: routes.length - 1,
    routes
  }
}
