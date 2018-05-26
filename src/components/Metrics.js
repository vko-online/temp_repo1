import { Dimensions, Platform } from 'react-native'

export default {
  screenWidth: Dimensions.get('window').width,
  screenHeight: Dimensions.get('window').height,
  statusBarHeight: 20,
  navbarHeight: Platform.OS === 'ios' ? 64 : 44
}
