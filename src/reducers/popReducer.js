export default function popReducer (state) {
  if (state.routes.length <= 1) return state
  const routes = state.routes.slice(0, -1)
  return {
    ...state,
    index: routes.length - 1,
    routes
  }
}
