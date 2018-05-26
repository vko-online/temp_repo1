import React, { Component } from 'react'
import {
  Animated,
  View,
  Text,
  StyleSheet
} from 'react-native'
import {
  Ionicons
} from '@expo/vector-icons'
import {
  TabViewAnimated,
  TabBar,
  SceneMap
} from 'react-native-tab-view'

import Profile from './profile'
import ActivityList from './activityList'
import Calendar from './calendar'

const IoniconsAnimated = Animated.createAnimatedComponent(Ionicons)

export default class BottomBarIconExample extends Component {
  state = {
    index: 0,
    routes: [
      {
        key: 'profile',
        icon: 'ios-contact'
      },
      {
        key: 'explore',
        icon: 'logo-buffer'
      },
      {
        key: 'messages',
        icon: 'ios-chatboxes'
      }
    ],
    opacityAnimation: {
      profile: new Animated.Value(0),
      explore: new Animated.Value(0),
      messages: new Animated.Value(0)
    }
  };

  handleIndexChange = index => this.setState({ index });

  renderIcon = ({ route, focused, index }) => {
    Animated.timing(
      this.state.opacityAnimation[route.key],
      {
        toValue: focused ? 1 : 0,
        duration: 1
      }
    ).start()
    const opacity = this.state.opacityAnimation[route.key].interpolate({
      inputRange: [0, 1],
      outputRange: [0.9, 1]
    })
    const shadowOpacity = this.state.opacityAnimation[route.key].interpolate({
      inputRange: [0, 1],
      outputRange: [0.5, 0.7]
    })
    const iconStyle = [
      styles.icon,
      index === 1 ? styles.icon__large : null
    ]
    const size = index === 1 ? 50 : 34
    return (
      <IoniconsAnimated
        name={route.icon}
        size={size}
        style={[
          iconStyle, {
            opacity,
            shadowOffset: { width: 0, height: 0 },
            shadowColor: 'black',
            shadowOpacity
          }
        ]}
      />
    )
  }

  renderBadge = ({ route }) => {
    if (route.key === 'messages') {
      return (
        <View style={styles.badge}>
          <Text style={styles.count}>42</Text>
        </View>
      )
    }
    return null
  };

  renderFooter = props => (
    <TabBar
      {...props}
      renderIcon={this.renderIcon}
      renderBadge={this.renderBadge}
      renderIndicator={() => null}
      style={styles.tabbar}
    />
  );

  renderScene = SceneMap({
    profile: () => <Profile {...this.props} />,
    explore: () => <ActivityList {...this.props} />,
    messages: () => <Calendar {...this.props} />
  });

  render () {
    return (
      <TabViewAnimated style={styles.tabview}
        navigationState={this.state}
        renderScene={this.renderScene}
        renderFooter={this.renderFooter}
        onIndexChange={this.handleIndexChange}
      />
    )
  }
}

const styles = StyleSheet.create({
  tabbar: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    position: 'absolute',
    bottom: 0,
    height: 100,
    left: '10%',
    right: '10%'
  },
  tabview: {
    backgroundColor: 'transparent'
  },
  icon: {
    backgroundColor: 'transparent',
    color: 'white',
    marginTop: 40
    // shadowOffset: { width: 10, height: 10 },
    // shadowColor: 'black'
    // shadowOpacity: 0.7
  },
  icon__large: {
    marginTop: 0
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 1
  },
  badge: {
    marginTop: 45,
    marginRight: 25,
    backgroundColor: '#f44336',
    height: 20,
    width: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4
  },
  count: {
    color: '#fff',
    fontSize: 10
  }
})
