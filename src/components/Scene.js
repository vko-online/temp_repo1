import React, { Component } from 'react'
import {
  View,
  ScrollView,
  StyleSheet
} from 'react-native'
import PropTypes from 'prop-types'

import Colors from './Colors'

const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.lightGrey
  }
})

class Scene extends Component {
  render () {
    const { scroll, padding, margin, children, flex, ...props } = this.props

    const paddingStyle = padding ? { padding } : null
    const marginStyle = margin ? { margin } : null
    const flexStyle = flex ? { flex: 1 } : null
    const rootStyle = [styles.root, paddingStyle, marginStyle, flexStyle]

    if (scroll) {
      return <ScrollView style={rootStyle} {...props}>{children}</ScrollView>
    }

    return <View style={rootStyle} {...props}>{children}</View>
  }
}

Scene.propTypes = {
  scroll: PropTypes.bool,
  padding: PropTypes.number,
  margin: PropTypes.number,
  flex: PropTypes.bool
}

export default Scene
