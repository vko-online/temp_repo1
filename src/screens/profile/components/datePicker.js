import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

import moment from 'moment'

import DateTimePicker from 'react-native-modal-datetime-picker'

import { Colors, Text } from '../../../components'

export default class DatePicker extends Component {
  static propTypes = {
    selectedValue: PropTypes.string,
    onSelect: PropTypes.func
  };

  state = {
    isDateTimePickerVisible: false
  };

  handleOpen = () => this.setState({ isDateTimePickerVisible: true });

  handleClose = () => this.setState({ isDateTimePickerVisible: false });

  handleDatePicked = date => {
    this.props.onSelect(date)
    this.handleClose()
  };

  render () {
    const date = this.props.selectedValue ? new Date(this.props.selectedValue) : new Date()
    return (
      <View style={styles.root}>
        <DateTimePicker
          date={date}
          isVisible={this.state.isDateTimePickerVisible}
          onCancel={this.handleClose}
          onConfirm={this.handleDatePicked}
        />
        <Text style={styles.text} onPress={this.handleOpen}>{moment(date).format('DD.MM.YYYY')}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  text: {
    paddingVertical: 5,
    color: Colors.lightText
  }
})
