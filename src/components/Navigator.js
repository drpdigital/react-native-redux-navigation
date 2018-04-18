import React from 'react'
import { BackHandler } from 'react-native'
import PropTypes from 'prop-types'
import NavigationPropTypes from '../propTypes'
import CardStack from './CardStack'
import Header from './Header'

class Navigator extends React.Component {

  static propTypes = {
    screenProps: PropTypes.any
  }

  static defaultProps = {
    screenProps: {}
  }

  constructor (props) {
    super(props)
    this.eventHandlers = {}
    this.state = {
      config: {}
    }
  }

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', this.navigateBack)
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.navigateBack)
  }

  navigateBack = () => {
    const { router, navigationState } = this.props
    if (navigationState.index === 0) return
    return router.pop()
  }

  emitEvent = (key, type, id) => {
    const event = { type, id }
    this.props.onNavigationEvent && this.props.onNavigationEvent(event)
    if (this.eventHandlers[key]) {
      this.eventHandlers[key](event)
    }
  }

  setOnNavigationEvent = (key, fn) => {
    this.eventHandlers[key] = fn
  }

  setOptions = (key, options) => {
    this.setState({
      config: {
        [key]: {
          ...this.state.config[key],
          ...options
        }
      }
    })
  }

  renderHeader = props => {
    const { router, headerComponent, headerStyles, renderButton } = this.props
    if (headerComponent === null) return null
    const { scene } = props
    const { route } = scene
    const key = scene.key + '_' + scene.index
    const Component = router.resolve(route.key)
    const navigationOptions = Component.navigationOptions || {}
    const title = this.state.config[key] && this.state.config[key].title
      ? this.state.config[key].title
      : navigationOptions.title || scene.route.key
    const headerLeftButton = this.state.config[key] && this.state.config[key].headerLeftButton
      ? this.state.config[key].headerLeftButton
      : navigationOptions.headerLeftButton
    const headerRightButton = this.state.config[key] && this.state.config[key].headerRightButton
      ? this.state.config[key].headerRightButton
      : navigationOptions.headerRightButton
    return (
      <Header
        {...props}
        title={title}
        headerLeftButton={headerLeftButton}
        headerRightButton={headerRightButton}
        navigateBack={this.navigateBack}
        renderButton={renderButton}
        emitEvent={this.emitEvent}
        styles={headerStyles}
        navigationOptions={navigationOptions}
      />
    )
  }

  renderScene = props => {
    const { router, screenProps } = this.props
    const { scene } = props
    const { route } = scene
    const key = scene.key + '_' + scene.index
    const Component = router.resolve(route.key)
    const navigation = {
      ...router,
      setOptions: options => this.setOptions(key, options),
      setOnNavigationEvent: fn => this.setOnNavigationEvent(key, fn)
    }
    return (
      <Component
        navigation={navigation}
        {...route.params}
        {...screenProps}
      />
    )
  }

  render () {
    return (
      <CardStack
        navigationState={this.props.navigationState}
        renderScene={this.renderScene}
        renderHeader={this.renderHeader}
        onTransitionEnd={this.onTransitionEnd}
      />
    )
  }
}

Navigator.propTypes = {
  headerComponent: PropTypes.any,
  headerStyles: PropTypes.any,
  navigationState: NavigationPropTypes.navigationState.isRequired,
  onNavigationEvent: PropTypes.func,
  renderButton: PropTypes.oneOfType([ PropTypes.node, PropTypes.func ]),
  router: NavigationPropTypes.router.isRequired,
  scene: NavigationPropTypes.scene
}

export default Navigator
