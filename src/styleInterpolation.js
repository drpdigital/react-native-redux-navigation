import { I18nManager } from 'react-native'

/**
 * Render the initial style for when the layout isn't measured yet
 */
function cardInitial (props) {
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

export function cardHorizontal (props) {
  const { layout, position, scene } = props
  if (!layout.isMeasured) return cardInitial(props)

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

export function headerLeft (props) {
  const { position, scene } = props
  const { index } = scene
  return {
    opacity: position.interpolate({
      inputRange: [ index - 1, index, index + 1 ],
      outputRange: ([ 0, 1, 0 ])
    })
  }
}

export function headerCenter (props) {
  const { position, scene } = props
  const { index } = scene
  return {
    opacity: position.interpolate({
      inputRange: [ index - 1, index, index + 1 ],
      outputRange: ([ 0, 1, 0 ])
    }),
    transform: [
      {
        translateX: position.interpolate({
          inputRange: [ index - 1, index + 1 ],
          outputRange: I18nManager.isRTL ? ([ -200, 200 ]) : ([ 200, -200 ])
        })
      }
    ]
  }
}

export function headerRight (props) {
  const { position, scene } = props
  const { index } = scene
  return {
    opacity: position.interpolate({
      inputRange: [ index - 1, index, index + 1 ],
      outputRange: ([ 0, 1, 0 ])
    })
  }
}
