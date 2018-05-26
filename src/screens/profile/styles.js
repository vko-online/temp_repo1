import {
  StyleSheet
} from 'react-native'

import { Colors } from '../../components'

const styles = StyleSheet.create({
  loading: {
    justifyContent: 'center',
    flex: 1
  },

  content: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },

  info: {
    paddingVertical: 10,
    marginLeft: 10
  },

  input: {
    width: 200,
    paddingVertical: 5,
    marginRight: 10,
    fontSize: 18,
    color: Colors.tundora
  }
})

export default styles
