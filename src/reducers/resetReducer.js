export default function resetReducer (state, action) {
  const { key, params } = action.payload
  const routes = [{ key, params }]
  return {
    ...state,
    index: routes.length - 1,
    routes
  }
}
