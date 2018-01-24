# React Native Redux Navigation

[![Build Status](https://travis-ci.org/drpdigital/react-native-redux-navigation.svg?branch=master)](https://travis-ci.org/drpdigital/react-native-redux-navigation)
[![License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://github.com/drpdigital/react-native-redux-navigation/blob/master/LICENSE)


A simple navigation package, based loosely on the now deprecated NavigationExperimental components from React Native.

Designed to work with redux.

#### Installation

```
yarn add drpdigital/react-native-redux-navigation
```

#### Usage

```jsx harmony
import React from 'react'
import { connect } from 'react-redux'
import { createRouter, Navigator } from 'react-native-redux-navigation'
import { Screen1, Screen2 } from './screens'

const App = () => (
  <Navigator
    navigationState={navigationState}
    router={router}
  />
)

const resolve = key => {
  switch (key) {
    case 'screen1': return MyScreen1
    case 'screen2': return MyScreen2
    default: throw new Error(`Unable to resolve component for route with key '${key}'`)
  }
}

const mapStateToProps = state => {
  return {
    navigationState: state.navigation
  }
}

const mapDispatchToProps = dispatch => {
  return {
    router: createRouter(dispatch, resolve)
  }
}

export connect(mapStateToProps, mapDispatchToProps)(App)
```

##### Navigator

 - `navigationState` - the current navigation state, usually pulled from the redux state in `mapStateToProps`
 - `router` a router, usually created using `createRouter` in `mapDispatchToProps`
 
 
##### createRouter

 - pass the dispatch function and a resolve function
 - resolve functions take a route key and return a component to render 
