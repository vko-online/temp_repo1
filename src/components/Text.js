import React from 'react'
import { StyleSheet, Dimensions, Text as ReactNativeText } from 'react-native'

import Colors from './Colors'

export function Text ({ style, ...props }) {
  return <ReactNativeText style={[styles.font, style]} {...props} />
}

export function Heading1 ({ style, ...props }) {
  return <ReactNativeText style={[styles.font, styles.h1, style]} {...props} />
}

export function Heading2 ({ style, ...props }) {
  return <ReactNativeText style={[styles.font, styles.h2, style]} {...props} />
}

export function Paragraph ({ style, ...props }) {
  return <ReactNativeText style={[styles.font, styles.p, style]} {...props} />
}

const scale = Dimensions.get('window').width / 375

function normalize (size) {
  return Math.round(scale * size)
}

const styles = StyleSheet.create({
  font: {
    fontFamily: 'Avenir Next'
  },

  h1: {
    fontSize: normalize(24),
    lineHeight: normalize(27),
    color: Colors.tundora,
    letterSpacing: -1
  },

  h2: {
    fontSize: normalize(18),
    lineHeight: normalize(22),
    color: Colors.tundora,
    letterSpacing: -1
  },

  p: {
    fontSize: normalize(15),
    lineHeight: normalize(23),
    color: Colors.tundora
  }
})
