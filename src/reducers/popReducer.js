export default function pushReducer (state) {
  if (state.index <= 0) return state
  const routes = state.routes.slice(0, -1)
  return {
    ...state,
    index: routes.length - 1,
    routes
  }
}
