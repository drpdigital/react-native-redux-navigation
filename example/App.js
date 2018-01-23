import React from 'react'
import { Provider } from 'react-redux'
import Root from './src/Root'
import store from "./src/store"

export default () => {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  )
}
