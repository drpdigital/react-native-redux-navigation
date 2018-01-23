import React from 'react'
import { connect } from 'react-redux'
import { createRouter, Navigator } from 'react-native-redux-navigation'
import HomeScreen from "./screens/HomeScreen"
import SubScreen from "./screens/SubScreen"

const Root = ({ navigationState, router }) => (
  <Navigator
    navigationState={navigationState}
    router={router}
  />
)

const resolve = key => {
  switch (key) {
    case 'home': return HomeScreen
    case 'sub': return SubScreen
  }
}

const mapStateToProps = state => ({
  navigationState: state.navigation
})

const mapDispatchToProps = dispatch => ({
  router: createRouter(dispatch, resolve)
})

export default connect(mapStateToProps, mapDispatchToProps)(Root)
