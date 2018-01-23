import React from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

const HeaderBackButton = props => (
  <TouchableOpacity style={styles.container} onPress={props.onPress}>
    <Image source={require('../assets/back-icon.png')} />
  </TouchableOpacity>
)

HeaderBackButton.propTypes = {
  onPress: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10
  }
})

export default HeaderBackButton
