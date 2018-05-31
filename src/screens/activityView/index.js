import React, { Component } from 'react'
import {
  View,
  ActivityIndicator
} from 'react-native'

import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'

import { ACTIVITY_QUERY } from '../../graphql/activity.query'

import { Text, Scene } from '../../components'

import styles from './styles'

class ActivityList extends Component {
  render () {
    const { loading, activity } = this.props

    if (loading || !activity) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <Scene>
        <Text>{activity.title}</Text>
      </Scene>
    )
  }
}

const activityQuery = graphql(ACTIVITY_QUERY, {
  skip: ownProps => !ownProps.navigation || !ownProps.navigation.state.params.id,
  options: ownProps => ({ variables: { id: ownProps.navigation.state.params.id } }),
  props: ({ data: { loading, activity } }) => ({
    loading,
    activity
  })
})

const mapStateToProps = ({ auth }) => ({
  auth
})

export default compose(connect(mapStateToProps), activityQuery)(ActivityList)
