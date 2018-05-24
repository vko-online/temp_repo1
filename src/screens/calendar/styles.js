import React from 'react'
import {
  View,
  StyleSheet
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export const Container = ({ children }) => (
  <View style={styles.container}>{children}</View>
)
