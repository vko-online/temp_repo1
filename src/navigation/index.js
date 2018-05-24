import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  AppState,
  Animated,
  Easing
} from 'react-native'
import {
  addNavigationHelpers,
  StackNavigator,
  NavigationActions,
  DrawerNavigator
} from 'react-navigation'
import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import { REHYDRATE } from 'redux-persist/constants'

import { Colors } from '../components'

import Auth from '../screens/auth'
import Home from '../screens/home'
import List from '../screens/list'
import Calendar from '../screens/calendar'
import Groups from '../screens/groups'
import NewGroup from '../screens/newGroup'

import { USER_QUERY } from '../graphql/user.query'

import { wsClient } from '../'

import DrawerContainer from './DrawerContainer'
import DrawerButton from './DrawerButton'

const noTransitionConfig = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0
  }
})

const GroupsStack = StackNavigator({
  Groups: { screen: Groups },
  NewGroup: { screen: NewGroup }
}, {
  headerMode: 'none',
  initialRouteName: 'Groups'
})

const DrawerStack = DrawerNavigator({
  Home: { screen: Home },
  List: { screen: List },
  GroupsStack: { screen: GroupsStack },
  Calendar: { screen: Calendar }
}, {
  gesturesEnabled: false,
  initialRouteName: 'GroupsStack',
  contentComponent: DrawerContainer
})

const DrawerNavigation = StackNavigator({
  DrawerStack: { screen: DrawerStack }
}, {
  headerMode: 'float',
  navigationOptions: ({navigation}) => {
    return {
      headerStyle: {
        backgroundColor: Colors.lightGrey,
        borderBottomWidth: 0
      },
      headerTintColor: 'white',
      gesturesEnabled: false,
      headerLeft: DrawerButton(navigation)
    }
  }
})

const LoginStack = StackNavigator({
  authScreen: { screen: Auth }
}, {
  headerMode: 'none'
})

// const DialogStack = StackNavigator({
//   NewGroup: { screen: NewGroup }
// }, {
//   navigationOptions: ({ navigation }) => ({
//     headerStyle: {
//       backgroundColor: Colors.lightGrey,
//       borderBottomWidth: 0
//     },
//     headerLeft: BackButton(navigation)
//   })
// })

const AppNavigator = StackNavigator(
  {
    loginStack: { screen: LoginStack },
    drawerStack: { screen: DrawerNavigation }
  },
  {
    headerMode: 'none',
    title: 'Main',
    initialRouteName: 'drawerStack',
    transitionConfig: noTransitionConfig,
    cardStyle: {
      borderRadius: 6,
      overflow: 'hidden',
      backgroundColor: '#000'
    }
  }
)

// reducer initialization code
const firstAction = AppNavigator.router.getActionForPathAndParams('drawerStack')
const tempNavState = AppNavigator.router.getStateForAction(firstAction)
const initialNavState = AppNavigator.router.getStateForAction(tempNavState)

// reducer code
export const navigationReducer = (state = initialNavState, action) => {
  let nextState
  switch (action.type) {
    case REHYDRATE:
      // convert persisted data to Immutable and confirm rehydration
      if (!action.payload.auth || !action.payload.auth.jwt) {
        const { routes, index } = state
        if (routes[index].routeName !== 'loginStack') {
          nextState = AppNavigator.router.getStateForAction(
            NavigationActions.navigate({ routeName: 'loginStack' }),
            state
          )
        }
      }
      break
    case 'LOGOUT':
      const { routes, index } = state
      if (routes[index].routeName !== 'loginStack') {
        nextState = AppNavigator.router.getStateForAction(
          NavigationActions.navigate({ routeName: 'loginStack' }),
          state
        )
      }
      break
    default:
      nextState = AppNavigator.router.getStateForAction(action, state)
      break
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state
}

class AppWithNavigationState extends Component {
  state = {
    appState: AppState.currentState
  };

  componentWillMount () {
    AppState.addEventListener('change', this.handleAppStateChange)
  }

  async componentWillReceiveProps (nextProps) {
    if (!nextProps.user) {
      // clear the event subscription
      if (this.reconnected) {
        this.reconnected()
      }
    } else if (!this.reconnected) {
      this.reconnected = wsClient.onReconnected(() => {
        this.props.refetch() // check for any data lost during disconnect
      }, this)
    }
  }

  componentWillUnmount () {
    AppState.removeEventListener('change', this.handleAppStateChange)
  }

  handleAppStateChange = async nextAppState => {
    this.setState({ appState: nextAppState })
  };

  render () {
    const { dispatch, nav } = this.props
    return (
      <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
    )
  }
}

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
  refetch: PropTypes.func,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    phone: PropTypes.string.isRequired
  })
}

const mapStateToProps = ({ auth, nav }) => ({
  auth,
  nav
})

const userQuery = graphql(USER_QUERY, {
  skip: ownProps => !ownProps.auth || !ownProps.auth.jwt,
  options: ownProps => ({ variables: { id: ownProps.auth.id } }),
  props: ({
    data: { loading, user, refetch },
    ownProps: { nav }
  }) => ({
    loading,
    user,
    refetch
  })
})

export default compose(connect(mapStateToProps), userQuery)(
  AppWithNavigationState
)
