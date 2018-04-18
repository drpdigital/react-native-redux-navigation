import React from 'react'
import {
  Animated,
  Platform,
  StyleSheet,
  ViewPropTypes
} from 'react-native'
import PropTypes from 'prop-types'
import { headerLeft, headerRight, headerCenter } from '../styleInterpolation'
import NavigationPropTypes from './NavigationPropTypes'
import HeaderTitle from './HeaderTitle'
import HeaderBackButton from './HeaderBackButton'

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0

const LEFT = 'left'
const RIGHT = 'right'

export default class Header extends React.PureComponent {
  renderLeftComponent = props => {
    const { headerLeftButton, renderButton } = this.props
    const { scene } = props
    const key = scene.key + '_' + scene.index
    if (scene.index > 0) {
      if (renderButton) return this.renderButton({ id: 'navigate-back', icon: 'chevron-left' }, key, LEFT)
      return <HeaderBackButton onPress={this.props.navigateBack} />
    }
    if (!headerLeftButton) return null
    return this.renderButton(headerLeftButton, key, LEFT)
  }

  renderTitleComponent = props => {
    const { title } = this.props
    const { styles } = props
    return (
      <HeaderTitle
        style={styles && styles.title}
        textStyle={styles && styles.titleText}
      >
        {title}
      </HeaderTitle>
    )
  }

  renderRightComponent = props => {
    const { headerRightButton } = this.props
    if (!headerRightButton) return null
    const { scene } = props
    const key = scene.key + '_' + scene.index
    return this.renderButton(headerRightButton, key, RIGHT)
  }

  renderButton (buttonConfig, key, position) {
    const { renderButton } = this.props
    if (!renderButton) return null
    const onPress = () => this.props.emitEvent(key, 'headerButtonPress', buttonConfig.id)
    return renderButton({ ...buttonConfig, onPress, position })
  }

  _renderLeft = (props) => {
    return this._renderSubView(
      props,
      LEFT,
      this.renderLeftComponent,
      headerLeft
    )
  }

  _renderTitle = (props) => {
    return this._renderSubView(
      props,
      'title',
      this.renderTitleComponent,
      headerCenter
    )
  }

  _renderRight = (props) => {
    return this._renderSubView(
      props,
      RIGHT,
      this.renderRightComponent,
      headerRight
    )
  }

  _renderSubView (props, name, renderer, styleInterpolator) {
    const { scene, navigationState } = props
    const { index, isStale, key } = scene
    const offset = navigationState.index - index

    // Scene is far away from the active scene. Hides it to avoid unnecessary rendering.
    if (Math.abs(offset) > 1) return null

    const subViewProps = {...props, onNavigateBack: this.props.onNavigateBack}
    const subView = renderer(subViewProps)
    if (subView === null) return null

    const pointerEvents = offset !== 0 || isStale ? 'none' : 'box-none'
    return (
      <Animated.View
        pointerEvents={pointerEvents}
        key={name + '_' + key}
        style={[
          baseStyles[name],
          { marginTop: this.props.statusBarHeight },
          styleInterpolator(props)
        ]}>
        {subView}
      </Animated.View>
    )
  }

  render () {
    const { scenes, styles, viewProps } = this.props

    const scenesProps = scenes.map(scene => {
      const props = NavigationPropTypes.extractSceneRendererProps(this.props)
      props.scene = scene
      return props
    })

    const barHeight = (this.props.statusBarHeight instanceof Animated.Value)
      ? Animated.add(this.props.statusBarHeight, new Animated.Value(APPBAR_HEIGHT))
      : APPBAR_HEIGHT + this.props.statusBarHeight

    return (
      <Animated.View
        style={[
          baseStyles.appbar,
          { height: barHeight },
          styles && styles.header
        ]}
        {...viewProps}
      >
        {scenesProps.map(this._renderLeft, this)}
        {scenesProps.map(this._renderTitle, this)}
        {scenesProps.map(this._renderRight, this)}
      </Animated.View>
    )
  }
}

Header.propTypes = {
  ...NavigationPropTypes.SceneRendererProps,
  statusBarHeight: PropTypes.number,
  style: ViewPropTypes.style,
  viewProps: PropTypes.shape(ViewPropTypes)
}

Header.defaultProps = {
  statusBarHeight: STATUSBAR_HEIGHT
}

Header.HEIGHT = APPBAR_HEIGHT + STATUSBAR_HEIGHT

/* eslint-disable react-native/no-unused-styles */
// rule does not currently allow array access
const baseStyles = StyleSheet.create({
  appbar: {
    alignItems: 'center',
    backgroundColor: Platform.OS === 'ios' ? '#EFEFF2' : '#FFF',
    borderBottomColor: 'rgba(0, 0, 0, .15)',
    borderBottomWidth: Platform.OS === 'ios' ? StyleSheet.hairlineWidth : 0,
    elevation: 4,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  title: {
    bottom: 0,
    left: APPBAR_HEIGHT,
    position: 'absolute',
    right: APPBAR_HEIGHT,
    top: 0
  },
  left: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    top: 0
  },
  right: {
    bottom: 0,
    position: 'absolute',
    right: 0,
    top: 0
  },
  button: {
    height: 24,
    width: 24,
    margin: Platform.OS === 'ios' ? 10 : 16
  }
})

/* eslint-enable */
