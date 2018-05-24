import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { logout } from '../actions/auth'

import { Colors } from '../components'

class DrawerContainer extends React.Component {
  logout = () => {
    this.props.dispatch(logout())
  }

  render () {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <Text
          onPress={() => navigation.navigate('Calendar')}
          style={styles.uglyDrawerItem}>
          Calendar
        </Text>
        <Text
          onPress={() => navigation.navigate('List')}
          style={styles.uglyDrawerItem}>
          Explore
        </Text>
        <Text
          onPress={() => navigation.navigate('Groups')}
          style={styles.uglyDrawerItem}>
          Groups
        </Text>
        <Text
          onPress={this.logout}
          style={styles.uglyDrawerItem}>
          Log out
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
    paddingTop: 40,
    paddingHorizontal: 20
  },
  uglyDrawerItem: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E73536',
    padding: 15,
    margin: 5,
    borderRadius: 2,
    borderColor: '#E73536',
    borderWidth: 1,
    textAlign: 'center'
  }
})

DrawerContainer.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = ({ auth }) => ({
  auth
})

export default connect(mapStateToProps)(DrawerContainer)
