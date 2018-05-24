import React from 'react'
import {
  View,
  StyleSheet
} from 'react-native'

import { Colors, Heading2 } from '../../components'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  contactRow__left: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  contactRow__title: {
    fontSize: 18,
    marginHorizontal: 5
  },
  contactRow__avatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.blue
  },
  contactRow__right: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },

  groupNameInput: {
    color: Colors.tundora,
    padding: 10,
    borderRadius: 5,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.alto
  },

  groupSelectedPeople: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.alto
  },

  groupSelectedPeople__title: {
    color: Colors.blue
  },

  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.dustyGray
  },

  createGroupButton: {
    paddingVertical: 10
  },

  footer: {
    marginTop: 50,
    marginBottom: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },

  listHeader: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})

export const Container = ({ children }) => (
  <View style={styles.container}>{children}</View>
)

export const Separator = () => <View style={styles.separator} />

export const Footer = ({ children }) => (
  <View style={styles.footer}>{children}</View>
)

export const ListHeader = ({ title, children }) => (
  <View style={styles.listHeader}>
    <Heading2>{title}</Heading2>
    {children}
  </View>
)

export default styles
