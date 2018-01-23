export default function resetReducer (state, action) {
  const { route } = action.payload
  const routes = [{ ...route }]
  return {
    ...state,
    index: routes.length - 1,
    routes
  }
}
