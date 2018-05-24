import React, { Component } from 'react'
import {
  View,
  Button,
  TextInput,
  Alert
} from 'react-native'
import PropTypes from 'prop-types'

import { TextInputMask } from 'react-native-masked-text'

import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'

import { setCurrentUser } from '../../actions/auth'
import LOGIN_MUTATION from '../../graphql/login.mutation'

import styles, {
  Container,
  Title,
  Or,
  Logo,
  Form,
  TextInputClear
} from './styles'

class Auth extends Component {
  state = {
    phone: undefined,
    password: undefined
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.auth.jwt) {
      nextProps.navigation.navigate('drawerStack')
    }
  }

  login = () => {
    const { phone, password } = this.state

    this.props
      .login({ phone, password })
      .then(({ data: { login: user } }) => {
        this.props.dispatch(setCurrentUser(user))
      })
      .catch(error => {
        Alert.alert(
          'error',
          error.message
        )
      })
  }

  handlePhoneChange = (text) => this.setState({ phone: text })
  handlePasswordChange = (text) => this.setState({ password: text })

  handlePhoneClear = () => this.setState({ phone: undefined })
  handlePasswordClear = () => this.setState({ password: undefined })

  render () {
    return (
      <Container>
        <Logo />
        <Title
          text='Welcome to Activity'
          subText='Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit Sed Do Eiusmod Tempor'
        />
        <Form>
          <View style={styles.phoneInputContainer}>
            <TextInputMask
              style={styles.input}
              value={this.state.phone}
              onChangeText={this.handlePhoneChange}
              placeholder='Phone'
              type='cel-phone'
              options={{
                dddMask: '+9 (999) 999-99-99'
              }}
            />
            <TextInputClear visible={!!this.state.phone} onPress={this.handlePhoneClear} />
          </View>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.input}
              value={this.state.password}
              placeholder='Password'
              secureTextEntry
              onChangeText={this.handlePasswordChange}
            />
            <TextInputClear visible={!!this.state.password} onPress={this.handlePasswordClear} />
          </View>
          <Button disabled={!this.state.phone} title='Continue' onPress={this.login} />
          <Or />
          <Button title='Login with Facebook' onPress={() => {}} />
        </Form>
      </Container>
    )
  }
}

Auth.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func
  }),
  auth: PropTypes.shape({
    loading: PropTypes.bool,
    jwt: PropTypes.string
  }),
  dispatch: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired
}

const login = graphql(LOGIN_MUTATION, {
  props: ({ mutate }) => ({
    login: user =>
      mutate({
        variables: { user }
      })
  })
})

const mapStateToProps = ({ auth }) => ({
  auth
})

export default compose(login, connect(mapStateToProps))(Auth)
