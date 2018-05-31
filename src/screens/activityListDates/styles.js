import React from 'react'
import {
  View,
  StyleSheet
} from 'react-native'

import { Colors } from '../../components'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loading: {
    justifyContent: 'center',
    flex: 1
  },

  date: {
    marginLeft: 10,
    marginBottom: 5,
    fontSize: 12,
    color: Colors.white
  }
})

export const Container = ({ children }) => (
  <View style={styles.container}>{children}</View>
)

export default styles
