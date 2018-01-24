import navigationStackReducer from '../reducers/navigationStackReducer'

// export a wrapper function to allow consuming code to set the initial state
export default initialState => (state = initialState, action) => navigationStackReducer(state, action)
