import { createStore, combineReducers } from 'redux'
import { createReducer } from 'react-native-redux-navigation'

const initialState = {
  navigation: {
    index: 0,
    routes: [{ key: 'home' }]
  }
}

const reducer = combineReducers({
  navigation: createReducer(initialState.navigation)
})

export default createStore(reducer)
