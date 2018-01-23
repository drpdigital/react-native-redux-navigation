import { Animated } from 'react-native'
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

export default {
  action,
  extractSceneRendererProps,
  navigationRoute,
  navigationState,
  navigation,
  router,
  scene,
  SceneRendererProps,
  SceneRenderer,
  style
}
