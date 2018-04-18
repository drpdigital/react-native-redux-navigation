import { Animated, ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'

/* NavigationAction */
const action = PropTypes.shape({
  type: PropTypes.string.isRequired
})

/* NavigationAnimatedValue  */
const animatedValue = PropTypes.instanceOf(Animated.Value)

/* NavigationRoute  */
const navigationRoute = PropTypes.shape({
  key: PropTypes.string.isRequired
})

/* NavigationState  */
const navigationState = PropTypes.shape({
  index: PropTypes.number.isRequired,
  routes: PropTypes.arrayOf(navigationRoute)
})

/* NavigationLayout */
const layout = PropTypes.shape({
  height: animatedValue,
  initHeight: PropTypes.number.isRequired,
  initWidth: PropTypes.number.isRequired,
  isMeasured: PropTypes.bool.isRequired,
  width: animatedValue
})

/* NavigationScene */
const scene = PropTypes.shape({
  index: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  isStale: PropTypes.bool.isRequired,
  key: PropTypes.string.isRequired,
  route: navigationRoute.isRequired
})

/* NavigationSceneRendererProps */
const SceneRendererProps = {
  layout: layout.isRequired,
  navigationState: navigationState.isRequired,
  position: animatedValue.isRequired,
  progress: animatedValue.isRequired,
  scene: scene.isRequired,
  scenes: PropTypes.arrayOf(scene).isRequired
}

const routerProps = {
  resolve: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  pop: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired
}

const router = PropTypes.shape(routerProps)

const navigation = PropTypes.shape({
  ...routerProps,
  setOptions: PropTypes.func,
  setOnNavigationEvent: PropTypes.func
})

const SceneRenderer = PropTypes.shape(SceneRendererProps)

const style = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.object,
  PropTypes.array
])

/**
 * Helper function that extracts the props needed for scene renderer.
 */
function extractSceneRendererProps (props) {
  return {
    layout: props.layout,
    navigationState: props.navigationState,
    position: props.position,
    progress: props.progress,
    scene: props.scene,
    scenes: props.scenes,
    styles: props.styles
  }
}

const CardStack = {
  /**
   * Custom style applied to the card.
   */
  cardStyle: style,

  /**
   * An interpolator function that is passed an object parameter
   * and should return a style object to apply to
   * the transitioning navigation card.
   *
   * Default interpolator transitions translateX, scale, and opacity.
   */
  cardStyleInterpolator: PropTypes.func,

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
  navigationState: navigationState.isRequired,

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

export default {
  action,
  extractSceneRendererProps,
  navigationRoute,
  navigationState,
  navigation,
  router,
  scene,
  CardStack,
  SceneRendererProps,
  SceneRenderer,
  style
}
