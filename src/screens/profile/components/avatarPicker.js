import React, { Component } from 'react'
import { Button, TouchableOpacity, Image, View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

import { ReactNativeFile } from 'apollo-upload-client'
import { Permissions, ImagePicker } from 'expo'

import { Colors } from '../../../components'

export default class AvatarPicker extends Component {
  static propTypes = {
    selectedValue: PropTypes.string,
    onSelect: PropTypes.func
  }

  renderImage = () => {
    const { selectedValue } = this.props
    if (selectedValue) {
      return (
        <TouchableOpacity onPress={this.pickImage}>
          <Image source={{ uri: selectedValue }} style={styles.image} />
        </TouchableOpacity>
      )
    }
    return null
  }

  renderButton = () => {
    const { selectedValue } = this.props
    if (!selectedValue) {
      return <Button title='Select' onPress={this.pickImage} />
    }
    return null
  }

  render () {
    return (
      <View style={styles.container}>
        {this.renderImage()}
        {this.renderButton()}
      </View>
    )
  }

  pickImage = async () => {
    const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL)
    if (status !== 'granted') {
      await Permissions.askAsync(Permissions.CAMERA_ROLL)
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    })

    if (!result.cancelled) {
      const avatar = new ReactNativeFile({
        name: 'avatar',
        type: result.type,
        path: result.uri,
        width: result.width,
        height: result.height,
        uri: result.uri
      })
      this.props.onSelect(avatar)
    }
  };
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: Colors.blue,
    width: 100,
    height: 100,
    overflow: 'hidden'
  },
  image: {
    width: 100,
    height: 100
  }
})
