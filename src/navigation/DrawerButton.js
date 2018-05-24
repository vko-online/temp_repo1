import React from 'react'
import {
  TouchableOpacity
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { Colors } from '../components'

const menuStyle = {
  marginHorizontal: 15,
  width: 40,
  justifyContent: 'center',
  alignItems: 'center'
}

export default (navigation) => (
  <TouchableOpacity style={menuStyle} onPress={() => navigation.navigate('DrawerToggle')}>
    <Ionicons size={24} color={Colors.blue} name='ios-menu' />
  </TouchableOpacity>
)
