import React from 'react'
import {Button, Text, View,} from 'react-native'
import styles from '../styles'

const HomeScreen = ({ navigation }) => (
  <View style={styles.screen}>
    <Text>Home Screen</Text>
    <Button
      onPress={() => navigation.push('sub')}
      title='Navigate'
    />
  </View>
)

HomeScreen.navigationOptions = {
  title: 'Home Screen'
}

export default HomeScreen
