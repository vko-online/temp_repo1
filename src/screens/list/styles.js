import React from 'react'
import {
  View,
  StyleSheet
} from 'react-native'

import { Colors, Heading2, Text } from '../../components'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  item: {
    padding: 10
  },

  itemCategoriesText: {}
})

export const Container = ({ children }) => (
  <View style={styles.container}>{children}</View>
)

export const Item = ({ data }) => (
  <View style={styles.item}>
    <Heading2>{data.name}</Heading2>
    <Text style={{color: Colors.random()}}>{data.categories.join(', ')}</Text>
  </View>
)
