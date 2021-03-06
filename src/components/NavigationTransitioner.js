import React from 'react'
import { Animated, Easing, StyleSheet, View, ViewPropTypes } from 'react-native'
import invariant from 'invariant'
import PropTypes from 'prop-types'
import NavigationPropTypes from '../propTypes'
import navigationScenesReducer from '../reducers/navigationScenesReducer'

const DefaultTransitionSpec = {
  duration: 250,
  easing: Easing.inOut(Easing.ease),
  timing: Animated.timing
}

/* eslint-disable react/require-default-props */
export default class NavigationTransitioner extends React.Component {
  static propTypes = {
    configureTransition: PropTypes.func,
    navigationState: NavigationPropTypes.navigationState.isRequired,
    onTransitionEnd: PropTypes.func,
    onTransitionStart: PropTypes.func,
    render: PropTypes.func.isRequired,
    style: ViewPropTypes.style
  }

  constructor (props, context) {
    super(props, context)

    // The initial layout isn't measured. Measured layout will be only available
    // when the component is mounted.
    const layout = {
      height: new Animated.Value(0),
      initHeight: 0,
      initWidth: 0,
      isMeasured: false,
      width: new Animated.Value(0)
    }

    this.state = {
      layout,
      position: new Animated.Value(this.props.navigationState.index),
      progress: new Animated.Value(1),
      scenes: navigationScenesReducer([], this.props.navigationState)
    }

    this._prevTransitionProps = null
    this._transitionProps = buildTransitionProps(props, this.state)
    this._isMounted = false
  }

  componentDidMount () {
    this._isMounted = true
  }

  componentWillReceiveProps (nextProps) {
    const nextScenes = navigationScenesReducer(
      this.state.scenes,
      nextProps.navigationState,
      this.props.navigationState
    )

    if (nextScenes === this.state.scenes) return

    const nextState = {
      ...this.state,
      scenes: nextScenes
    }

    const { position, progress } = nextState

    progress.setValue(0)

    this._prevTransitionProps = this._transitionProps
    this._transitionProps = buildTransitionProps(nextProps, nextState)

    // get the transition spec.
    const transitionUserSpec = nextProps.configureTransition
      ? nextProps.configureTransition(this._transitionProps, this._prevTransitionProps)
      : null

    const transitionSpec = {
      ...DefaultTransitionSpec,
      ...transitionUserSpec
    }

    const {timing} = transitionSpec
    delete transitionSpec.timing

    const animations = [
      timing(
        progress,
        {
          ...transitionSpec,
          toValue: 1
        }
      )
    ]
    if (nextProps.navigationState.index !== this.props.navigationState.index) {
      animations.push(
        timing(
          position,
          {
            ...transitionSpec,
            toValue: nextProps.navigationState.index
          }
        )
      )
    }

    // update scenes and play the transition
    this.setState(nextState, () => {
      nextProps.onTransitionStart && nextProps.onTransitionStart(
        this._transitionProps,
        this._prevTransitionProps
      )
      Animated.parallel(animations).start(this._onTransitionEnd)
    })
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  _onLayout = (event) => {
    const {height, width} = event.nativeEvent.layout
    if (this.state.layout.initWidth === width &&
      this.state.layout.initHeight === height) {
      return
    }
    const layout = {
      ...this.state.layout,
      initHeight: height,
      initWidth: width,
      isMeasured: true
    }

    layout.height.setValue(height)
    layout.width.setValue(width)

    const nextState = {
      ...this.state,
      layout
    }

    this._transitionProps = buildTransitionProps(this.props, nextState)
    this.setState(nextState)
  }

  _onTransitionEnd = () => {
    if (!this._isMounted) return

    const prevTransitionProps = this._prevTransitionProps
    this._prevTransitionProps = null

    const nextState = {
      ...this.state,
      scenes: this.state.scenes.filter(isSceneNotStale)
    }

    this._transitionProps = buildTransitionProps(this.props, nextState)

    this.setState(nextState, () => {
      this.props.onTransitionEnd && this.props.onTransitionEnd(
        this._transitionProps,
        prevTransitionProps
      )
    })
  }

  render () {
    return (
      <View
        onLayout={this._onLayout}
        style={[styles.main, this.props.style]}>
        {this.props.render(this._transitionProps, this._prevTransitionProps)}
      </View>
    )
  }
}

function buildTransitionProps (props, state) {
  const { navigationState } = props

  const {
    layout,
    position,
    progress,
    scenes
  } = state

  const scene = scenes.find(isSceneActive)

  invariant(scene, 'No active scene when building navigation transition props.')

  return {
    layout,
    navigationState,
    position,
    progress,
    scenes,
    scene
  }
}

const isSceneNotStale = scene => !scene.isStale
const isSceneActive = scene => scene.isActive

const styles = StyleSheet.create({
  main: { flex: 1 }
})
