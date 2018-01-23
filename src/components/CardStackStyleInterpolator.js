import { I18nManager } from 'react-native'

/**
 * Utility that builds the style for the card in the cards stack.
 *
 *     +------------+
 *   +-+            |
 * +-+ |            |
 * | | |            |
 * | | |  Focused   |
 * | | |   Card     |
 * | | |            |
 * +-+ |            |
 *   +-+            |
 *     +------------+
 */

/**
 * Render the initial style when the initial layout isn't measured yet.
 */
function forInitial (props) {
  const { navigationState, scene } = props
  const focused = navigationState.index === scene.index
  const opacity = focused ? 1 : 0
  // If not focused, move the scene to the far away.
  const translate = focused ? 0 : 1000000
  return {
    opacity,
    transform: [
      { translateX: translate },
      { translateY: translate }
    ]
  }
}

function forHorizontal (props) {
  const { layout, position, scene } = props
  if (!layout.isMeasured) return forInitial(props)

  const index = scene.index
  const inputRange = [index - 1, index, index + 0.99, index + 1]
  const width = layout.initWidth
  const outputRange = I18nManager.isRTL ? ([-width, 0, 10, 10]) : ([width, 0, -10, -10])

  const opacity = position.interpolate({
    inputRange,
    outputRange: ([1, 1, 0.3, 0])
  })

  const scale = position.interpolate({
    inputRange,
    outputRange: ([1, 1, 0.95, 0.95])
  })

  const translateY = 0
  const translateX = position.interpolate({
    inputRange,
    outputRange
  })

  return {
    opacity,
    transform: [
      { scale },
      { translateX },
      { translateY }
    ]
  }
}

function forVertical (props) {
  const { layout, position, scene } = props
  if (!layout.isMeasured) return forInitial(props)

  const index = scene.index
  const inputRange = [index - 1, index, index + 0.99, index + 1]
  const height = layout.initHeight

  const opacity = position.interpolate({
    inputRange,
    outputRange: ([1, 1, 0.3, 0])
  })

  const scale = position.interpolate({
    inputRange,
    outputRange: ([1, 1, 0.95, 0.95])
  })

  const translateX = 0
  const translateY = position.interpolate({
    inputRange,
    outputRange: ([height, 0, -10, -10])
  })

  return {
    opacity,
    transform: [
      { scale },
      { translateX },
      { translateY }
    ]
  }
}

function canUseNativeDriver (isVertical) {
  // The native driver can be enabled for this interpolator because the scale,
  // translateX, and translateY transforms are supported with the native
  // animation driver.
  return true
}

export default {
  forHorizontal,
  forVertical,
  canUseNativeDriver
}
