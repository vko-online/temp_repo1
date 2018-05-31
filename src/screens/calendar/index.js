import React, { Component } from 'react'
import {
  View,
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity
} from 'react-native'

import { Agenda } from 'react-native-calendars'
import { Entypo } from '@expo/vector-icons'
import { LinearGradient } from 'expo'

import moment from 'moment'

import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'

import { ACTIVITY_ALL_QUERY } from '../../graphql/activity.query'

import { Colors, Text, Scene, Draggable } from '../../components'

import ActivityList from '../activityList'

import styles, { Content } from './styles'

class Calendar extends Component {
  state = {
    date: new Date()
  }
  onDayPress = (date) => {
    this.setState({
      date: new Date(date.year, date.month - 1, date.day)
    })
  };

  onDayChange = (date) => {
    this.setState({
      date: new Date(date.year, date.month - 1, date.day)
    })
  };

  render () {
    const { loading, activities } = this.props

    if (loading || !activities.length) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator />
        </View>
      )
    }

    const events = activities
      .reduce((all, next) => {
        const item = {
          text: next.title,
          id: next.id,
          image_url: next.image_url
        }
        const key = moment(next.start_date).format('YYYY-MM-DD')
        if (all[key]) {
          all[key].push(item)
        } else {
          all[key] = [item]
        }
        return all
      }, {})

    const items = {
      [moment(new Date(this.state.date)).format('YYYY-MM-DD')]: [],
      ...events
    }

    return (
      <Scene flex>
        <Draggable
          initialDrawerSize={0.35}
          renderContainerView={() => (
            <Agenda
              items={items}
              onDayPress={this.onDayPress}
              onDayChange={this.onDayChange}
              pastScrollRange={12}
              futureScrollRange={12}
              renderItem={this.renderItem}
              renderEmptyDate={this.renderEmptyDate}
              rowHasChanged={this.rowHasChanged}
              renderKnob={this.renderKnob}
              style={{margin: 10, borderRadius: 10, overflow: 'hidden'}}
              theme={{
                backgroundColor: Colors.whiteOne,
                calendarBackground: Colors.white,
                'stylesheet.day.basic': {
                  dot: {
                    width: 20,
                    height: 4,
                    marginTop: 1,
                    borderRadius: 2,
                    opacity: 0
                  },
                  visibleDot: {
                    opacity: 1,
                    backgroundColor: Colors.lightBlue
                  },
                  selectedDot: {
                    width: 4,
                    backgroundColor: Colors.white
                  }
                }
              }}
            />
          )}
          renderDrawerView={() => (
            <View style={styles.content__wrapper}>
              <Content>
                <ActivityList {...this.props} />
              </Content>
            </View>
          )}
          renderInitDrawerView={(isOnTop) => {
            if (isOnTop) {
              return (
                <View style={styles.anchor__wrapper}>
                  <View style={styles.anchor}>
                    <Entypo size={24} name='chevron-small-down' color={Colors.lightBlue} />
                  </View>
                </View>
              )
            }
            return (
              <View style={styles.anchor__wrapper}>
                <View style={styles.anchor}>
                  <Entypo size={24} name='chevron-small-up' color={Colors.lightBlue} />
                </View>
              </View>
            )
          }}
        />
      </Scene>
    )
  }

  handlePress = (id) => this.props.navigation.navigate('ActivityView', { id })

  renderItem = (item) => {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => this.handlePress(item.id)}>
        <ImageBackground
          source={{uri: item.image_url}}
          style={styles.item}
        >
          <LinearGradient
            start={{ x: 0, y: 0.2 }}
            end={{ x: 0, y: 1 }}
            colors={['rgba(0, 0, 0, 0.4)', 'transparent']}
            style={styles.gradient}
          >
            <View style={styles.cover}>
              <Text style={styles.item__text}>{item.text}</Text>
            </View>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
    )
  }

  renderEmptyDate = () => <View style={styles.emptyDate} />
  rowHasChanged = (r1, r2) => r1.id !== r2.id
  renderKnob = () => <Entypo size={24} name='chevron-small-down' color={Colors.lightBlue} />
}

const activityQuery = graphql(ACTIVITY_ALL_QUERY, {
  props: ({ data: { loading, activities } }) => ({
    loading,
    activities
  })
})

const mapStateToProps = ({ auth }) => ({
  auth
})

export default compose(connect(mapStateToProps), activityQuery)(Calendar)
