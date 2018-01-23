import React from 'react'
import { Text, View, } from 'react-native'
import styles from '../styles'

const SubScreen = () => (
  <View style={styles.screen}>
    <Text>Sub Screen</Text>
  </View>
)

SubScreen.navigationOptions = {
  title: 'A Sub Screen'
}

export default SubScreen
