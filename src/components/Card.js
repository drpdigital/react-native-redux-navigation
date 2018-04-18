import React from 'react'
import { Animated, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { cardHorizontal } from '../styleInterpolation'
import PointerEventsContainer from './PointerEventsContainer'

/**
 * Component that renders the scene as a card within the <CardStack />
 */
class Card extends React.PureComponent {
  static propTypes = {
    onComponentRef: PropTypes.func.isRequired,
    pointerEvents: PropTypes.string.isRequired,
    renderScene: PropTypes.func.isRequired,
    // TODO work out what is going on with the opacity being passed in and use PropTypes.style
    style: PropTypes.any
  }

  render () {
    const {
      onComponentRef,
      pointerEvents,
      renderScene,
      style,
      ...props
    } = this.props

    const viewStyle = style === undefined ? cardHorizontal(props) : style

    return (
      <Animated.View
        pointerEvents={pointerEvents}
        ref={onComponentRef}
        style={[styles.main, viewStyle]}
      >
        {renderScene(props)}
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#E9E9EF',
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.4,
    shadowRadius: 10,
    top: 0
  }
})

export default PointerEventsContainer.create(Card)
