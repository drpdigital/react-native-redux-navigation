import React from 'react'
import { Platform, StyleSheet, View, Text, ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'

const HeaderTitle = ({ children, style, textStyle }) => (
  <View style={[ styles.title, style ]}>
    <Text style={[ styles.text, textStyle ]}>{children}</Text>
  </View>
)

const styles = StyleSheet.create({
  title: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16
  },
  text: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: 'rgba(0, 0, 0, .9)',
    textAlign: Platform.OS === 'ios' ? 'center' : 'left'
  }
})

HeaderTitle.propTypes = {
  children: PropTypes.node.isRequired,
  style: ViewPropTypes.style,
  textStyle: Text.propTypes.style
}

export default HeaderTitle
