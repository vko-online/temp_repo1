import React, { Component } from 'react'
import {
  View,
  ScrollView,
  StyleSheet
} from 'react-native'

import { Agenda } from 'react-native-calendars'

import { Heading1, Text } from '../../components'

export default class AgendaScreen extends Component {
  state = {
    items: {}
  }

  render () {
    return (
      <View style={{flex: 1}}>
        <View style={{height: 360, borderColor: '#ccc', borderBottomWidth: StyleSheet.hairlineWidth}}>
          <Agenda
            items={this.state.items}
            pagingEnabled
            horizontal
            loadItemsForMonth={this.loadItems}
            selected={'2017-05-16'}
            renderItem={this.renderItem}
            renderEmptyDate={this.renderEmptyDate}
            rowHasChanged={this.rowHasChanged}
          />
        </View>
        <View style={{flex: 1, backgroundColor: '#eee', padding: 10}}>
          <ScrollView style={{flex: 1, backgroundColor: '#fff', padding: 10, borderColor: '#ccc', borderWidth: StyleSheet.hairlineWidth}}>
            <View>
              <Heading1>8</Heading1><Text>private events</Text>
            </View>
            <View>
              <Heading1>127</Heading1><Text>public events</Text>
            </View>
            <View>
              <Heading1>3</Heading1><Text>events you going</Text>
            </View>
            <View>
              <Heading1>16</Heading1><Text>events might be interesting</Text>
            </View>
            <View>
              <Heading1>5</Heading1><Text>notifications</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    )
  }

  loadItems = (day) => {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000
        const strTime = this.timeToString(time)
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = []
          const numItems = Math.floor(Math.random() * 5)
          for (let j = 0; j < numItems; j++) {
            this.state.items[strTime].push({
              name: 'Item for ' + strTime
            })
          }
        }
      }
      const newItems = {}
      Object.keys(this.state.items).forEach(key => { newItems[key] = this.state.items[key] })
      this.setState({
        items: newItems
      })
    }, 1000)
  }

  renderItem = (item) => {
    return (
      <View style={styles.item}><Text>{item.name}</Text></View>
    )
  }

  renderEmptyDate = () => null

  rowHasChanged = (r1, r2) => r1.name !== r2.name

  timeToString = (time) => {
    const date = new Date(time)
    return date.toISOString().split('T')[0]
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  }
})
