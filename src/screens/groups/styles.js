import React from 'react'
import {
  View,
  StyleSheet
} from 'react-native'

import { Colors, Heading2 } from '../../components'

const styles = StyleSheet.create({
  list: {
    marginBottom: 20
  },
  listHeader: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.dustyGray
  },

  groupRow: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  groupRow__left: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  groupRow__right: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  groupRow__title: {
    fontSize: 18,
    marginHorizontal: 5
  },
  groupRow__avatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.blue
  },
  groupRow__count: {
    marginLeft: 3,
    color: Colors.boulder,
    fontSize: 12
  },

  contactRow: {
    padding: 5,
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

  actionButton: {
    paddingLeft: 10,
    paddingRight: 5
  },
  deleteAction: {
    backgroundColor: Colors.dustyOrange,
    width: 100,
    padding: 7
  },
  deleteAction__text: {
    color: Colors.white
  }
})

export const ListHeader = ({ title, children }) => (
  <View style={styles.listHeader}>
    <Heading2>{title}</Heading2>
    {children}
  </View>
)

export const Separator = () => <View style={styles.separator} />

export default styles
