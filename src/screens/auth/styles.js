import React from 'react'
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native'

import { Ionicons } from '@expo/vector-icons'

import { Colors, Text, Heading1, Paragraph } from '../../components'

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1
  },

  titleContainer: {
    flex: 1,
    justifyContent: 'center'
  },

  title: {
    textAlign: 'center'
  },

  subTitle: {
    marginTop: 10,
    textAlign: 'center'
  },

  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  logo: {
    width: 160,
    height: 160
  },

  form: {
    flex: 1
  },

  orContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },

  or: {
    textAlign: 'center',
    marginHorizontal: 10
  },

  orLine: {
    width: 50,
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.tundora
  },

  phoneInputContainer: {
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row'
  },

  passwordInputContainer: {
    marginTop: 0,
    marginBottom: 10,
    marginHorizontal: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row'
  },

  input: {
    flex: 1,
    color: Colors.tundora,
    padding: 10,
    paddingRight: 32,
    borderRadius: 5,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.alto
  },

  inputClear: {
    marginLeft: -26
  }
})

export const Container = ({ children }) => (
  <KeyboardAvoidingView behavior='padding' style={styles.container}>{children}</KeyboardAvoidingView>
)

export const Title = ({ text, subText }) => (
  <View style={styles.titleContainer}>
    <Heading1 style={styles.title}>{text}</Heading1>
    <Paragraph style={styles.subTitle}>{subText}</Paragraph>
  </View>
)

export const Or = () => (
  <View style={styles.orContainer}>
    <View style={styles.orLine} />
    <Text style={styles.or}>or</Text>
    <View style={styles.orLine} />
  </View>
)

export const Logo = () => (
  <View style={styles.logoContainer}>
    <Image source={require('../../assets/logo2.png')} style={styles.logo} />
  </View>
)

export const TextInputClear = ({ visible, onPress }) => (visible &&
  <TouchableOpacity style={styles.inputClear} onPress={onPress}>
    <Ionicons name='ios-close-circle-outline' size={24} color={Colors.alto} />
  </TouchableOpacity>
)

export const Form = ({ children }) => (
  <View style={styles.form}>{children}</View>
)

export default styles
