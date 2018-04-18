import React from 'react'
import { Animated } from 'react-native'
import PropTypes from 'prop-types'
import invariant from 'invariant'
import AnimatedValueSubscription from './AnimatedValueSubscription'
import NavigationPropTypes from '../propTypes'

const MIN_POSITION_OFFSET = 0.01

/**
 * Create a higher-order component that automatically computes the
 * `pointerEvents` property for a component whenever navigation position
 * changes.
 */
function create (Component) {
  class Container extends React.Component {
    static propTypes = {
      navigationState: NavigationPropTypes.navigationState.isRequired,
      position: PropTypes.instanceOf(Animated.Value),
      scene: NavigationPropTypes.scene
    }

    constructor (props, context) {
      super(props, context)
      this._pointerEvents = this._computePointerEvents()
    }

    componentDidMount () {
      this._bindPosition(this.props)
    }

    componentWillReceiveProps (nextProps) {
      this._bindPosition(nextProps)
    }

    componentWillUnmount () {
      this._positionListener && this._positionListener.remove()
    }

    _onComponentRef = (component) => {
      this._component = component
      if (component) {
        invariant(
          typeof component.setNativeProps === 'function',
          'component must implement method `setNativeProps`'
        )
      }
    }

    _bindPosition (props) {
      this._positionListener && this._positionListener.remove()
      this._positionListener = new AnimatedValueSubscription(
        props.position,
        this._onPositionChange
      )
    }

    _onPositionChange = () => {
      if (this._component) {
        const pointerEvents = this._computePointerEvents()
        if (this._pointerEvents !== pointerEvents) {
          this._pointerEvents = pointerEvents
          this._component.setNativeProps({pointerEvents})
        }
      }
    }

    _computePointerEvents () {
      const {
        navigationState,
        position,
        scene
      } = this.props

      if (scene.isStale || navigationState.index !== scene.index) {
        // The scene isn't focused.
        return scene.index > navigationState.index ? 'box-only' : 'none'
      }

      const offset = position.__getAnimatedValue() - navigationState.index
      if (Math.abs(offset) > MIN_POSITION_OFFSET) {
        // The positon is still away from scene's index.
        // Scene's children should not receive touches until the position
        // is close enough to scene's index.
        return 'box-only'
      }

      return 'auto'
    }

    render () {
      this._pointerEvents = this._computePointerEvents()
      return (
        <Component
          {...this.props}
          pointerEvents={this._pointerEvents}
          onComponentRef={this._onComponentRef}
        />
      )
    }
  }
  return Container
}

export default { create }
