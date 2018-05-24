import React from 'react'
import {
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import PropTypes from 'prop-types'

import Colors from './Colors'
import { Text } from './Text'

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    backgroundColor: Colors.blue,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginHorizontal: 10
  },
  text: {
    color: Colors.white,
    textAlign: 'center'
  },
  outline: {
    backgroundColor: null,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.blue
  },
  textOutline: {
    color: Colors.blue
  },
  disabled: {
    backgroundColor: Colors.dustyGray
  },
  textDisabled: {
    color: Colors.lightGrey
  }
})

const Button = ({ onPress, text, outline, style, disabled, ...props }) => {
  const dynamicButtonStyle = [
    styles.button,
    style,
    outline ? styles.outline : null,
    disabled ? styles.disabled : null
  ]

  const dynamicTextStyle = [
    styles.text,
    outline ? styles.textOutline : null,
    disabled ? styles.textDisabled : null
  ]

  return (
    <TouchableOpacity onPress={onPress} style={dynamicButtonStyle} disabled={disabled} {...props}>
      <Text style={dynamicTextStyle}>{text}</Text>
    </TouchableOpacity>
  )
}

Button.propTypes = {
  onPress: PropTypes.func,
  text: PropTypes.string,
  outline: PropTypes.bool,
  disabled: PropTypes.bool
}

export default Button
