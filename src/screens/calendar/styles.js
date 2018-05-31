import React from 'react'
import {
  View,
  StyleSheet,
  ScrollView
} from 'react-native'

import { Colors } from '../../components'

const styles = StyleSheet.create({
  loading: {
    justifyContent: 'center',
    flex: 1
  },

  content: {
    flex: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: Colors.white,
    marginHorizontal: 10
  },

  contentContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center'
  },

  content__wrapper: {
    backgroundColor: Colors.lightGrey,
    flex: 1
  },

  anchor: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginHorizontal: 10,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center'
  },

  anchor__wrapper: {
    backgroundColor: Colors.lightGrey,
    paddingTop: 10
  },

  item: {
    margin: 5,
    height: 70,
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden'
  },
  item__text: {
    color: Colors.white
  },
  gradient: {
    flex: 1
  },
  cover: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 5
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  }
})

export const Content = ({ children }) => (
  <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>{children}</ScrollView>
)

export default styles
