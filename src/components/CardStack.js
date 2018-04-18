import React from 'react'
import { NativeModules, StyleSheet, View } from 'react-native'
import { cardHorizontal } from '../styleInterpolation'
import NavigationPropTypes from '../propTypes'
import Card from './Card'
import NavigationTransitioner from './NavigationTransitioner'

/* eslint-disable react/require-default-props */
class CardStack extends React.Component {
  static propTypes = NavigationPropTypes.CardStack

  _configureTransition = () => {
    const animationConfig = {}
    if (NativeModules.NativeAnimatedModule) {
      animationConfig.useNativeDriver = true
    }
    return animationConfig
  }

  _render = (props) => {
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
        <View style={[styles.scenes, this.props.scenesStyle]}>
          {scenes}
        </View>
        {header}
      </View>
    )
  }

  _renderScene = (props) => {
    const { scene, navigationState } = props
    const { index } = scene
    const offset = navigationState.index - index

    // Scene is far away from the active scene. Hides it to avoid unnecessary rendering.
    if (Math.abs(offset) > 1) return null

    const style = cardHorizontal(props)
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
