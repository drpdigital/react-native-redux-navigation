import React from 'react'
import { NativeModules, StyleSheet, View, ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'
import CardStackStyleInterpolator from './CardStackStyleInterpolator'
import Card from './Card'
import NavigationTransitioner from './NavigationTransitioner'
import NavigationPropTypes from './NavigationPropTypes'

const NativeAnimatedModule = NativeModules.NativeAnimatedModule

const Directions = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical'
}

/**
 * A controlled navigation view that renders a stack of cards.
 *
 * ```html
 *     +------------+
 *   +-|   Header   |
 * +-+ |------------|
 * | | |            |
 * | | |  Focused   |
 * | | |   Card     |
 * | | |            |
 * +-+ |            |
 *   +-+            |
 *     +------------+
 * ```
 *
 * ## Example
 *
 * ```js
 *
 * class App extends React.Component {
 *   constructor(props, context) {
 *     this.state = {
 *       navigation: {
 *         index: 0,
 *         routes: [
 *           {key: 'page 1'},
 *         },
 *       },
 *     }
 *   }
 *
 *   render() {
 *     return (
 *       <CardStack
 *         navigationState={this.state.navigation}
 *         renderScene={this._renderScene}
 *       />
 *     )
 *   }
 *
 *   _renderScene: (props) => {
 *     return (
 *       <View>
 *         <Text>{props.scene.route.key}</Text>
 *       </View>
 *     )
 *   }
 * ```
 */
/* eslint-disable react/require-default-props */
class CardStack extends React.Component {
  static propTypes = {
    /**
     * Custom style applied to the card.
     */
    cardStyle: NavigationPropTypes.style,

    /**
     * An interpolator function that is passed an object parameter
     * and should return a style object to apply to
     * the transitioning navigation card.
     *
     * Default interpolator transitions translateX, scale, and opacity.
     */
    cardStyleInterpolator: PropTypes.func,

    /**
     * Direction of the cards movement. Value could be `horizontal` or
     * `vertical`. Default value is `horizontal`.
     */
    direction: PropTypes.oneOf([Directions.HORIZONTAL, Directions.VERTICAL]),

    /**
     * The controlled navigation state. Typically, the navigation state
     * look like this:
     *
     * ```js
     * const navigationState = {
     *   index: 0, // the index of the selected route.
     *   routes: [ // A list of routes.
     *     {key: 'page 1'}, // The 1st route.
     *     {key: 'page 2'}, // The second route.
     *   ],
     * }
     * ```
     */
    navigationState: NavigationPropTypes.navigationState.isRequired,

    /**
     * Callback that is called when the "back" action is performed.
     * This happens when the back button is pressed
     */
    onNavigateBack: PropTypes.func,

    onTransitionEnd: PropTypes.func,

    /**
     * Function that renders the header.
     */
    renderHeader: PropTypes.func,

    /**
     * Function that renders the a scene for a route.
     */
    renderScene: PropTypes.func.isRequired,

    /**
     * Custom style applied to the scenes stack.
     */
    scenesStyle: ViewPropTypes.style,
    /**
     * Custom style applied to the cards stack.
     */
    style: ViewPropTypes.style
  }

  static defaultProps = {
    direction: Directions.HORIZONTAL
  }

  componentWillMount () {
    this._render = this._render.bind(this)
    this._renderScene = this._renderScene.bind(this)
  }

  _configureTransition = () => {
    const isVertical = this.props.direction === 'vertical'
    const animationConfig = {}
    if (!!NativeAnimatedModule && CardStackStyleInterpolator.canUseNativeDriver(isVertical)) {
      animationConfig.useNativeDriver = true
    }
    return animationConfig
  }

  _render (props) {
    const { renderHeader } = this.props

    const header = renderHeader ? <View>{renderHeader(props)}</View> : null

    const scenes = props.scenes.map(
      scene => this._renderScene({
        ...props,
        scene
      })
    )

    return (
      <View style={styles.container}>
        <View
          style={[styles.scenes, this.props.scenesStyle]}
        >
          {scenes}
        </View>
        {header}
      </View>
    )
  }

  _renderScene (props) {
    const isVertical = this.props.direction === 'vertical'

    const interpolator = this.props.cardStyleInterpolator || (isVertical
      ? CardStackStyleInterpolator.forVertical
      : CardStackStyleInterpolator.forHorizontal)

    const style = interpolator(props)

    return (
      <Card
        {...props}
        key={'card_' + props.scene.key}
        renderScene={this.props.renderScene}
        style={[style, this.props.cardStyle]}
      />
    )
  }

  render () {
    return (
      <NavigationTransitioner
        configureTransition={this._configureTransition}
        navigationState={this.props.navigationState}
        onTransitionEnd={this.props.onTransitionEnd}
        render={this._render}
        style={this.props.style}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Header is physically rendered after scenes so that Header won't be covered by the shadows of the scenes
    // That said, we'd have use `flexDirection: 'column-reverse'` to move Header above the scenes
    flexDirection: 'column-reverse'
  },
  scenes: { flex: 1 }
})

export default CardStack
