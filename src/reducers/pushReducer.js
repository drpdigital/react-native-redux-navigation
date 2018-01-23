export default function pushReducer (state, action) {
  const { route } = action.payload
  const routes = [ ...state.routes ]
  routes.push({ ...route })
  return {
    ...state,
    index: routes.length - 1,
    routes
  }
}
