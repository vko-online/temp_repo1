import React, { Component } from 'react'
import {
  ActivityIndicator,
  View,
  TextInput
} from 'react-native'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import Spinner from 'react-native-loading-spinner-overlay'

import get from 'lodash/get'

import { Scene } from '../../components'

import { USER_QUERY } from '../../graphql/user.query'
import {
  UPDATE_USER_MUTATION,
  REMOVE_USER_IMAGE_MUTATION
} from '../../graphql/user.mutation'

import AvatarPicker from './components/avatarPicker'
import DatePicker from './components/datePicker'

import styles from './styles'

class Profile extends Component {
  state = {
    updating: false,
    name: get(this.props.currentUser, 'name', '')
  };

  componentWillReceiveProps (nextProps) {
    if (nextProps.currentUser && nextProps.currentUser.name) {
      this.setState({ name: nextProps.currentUser.name })
    }
  }

  handleNameChange = name => this.setState({ name });
  handleDateChange = dob => this.setState({ dob }, this.updateUser);
  handleAvatarSelect = avatar => this.setState({ avatar }, this.updateUser);

  handleImageRemove = val => {
    this.props.removeUserImage({ image: val }).then(({
      data: { removeUserImage }
    }) => {
      this.setState({ updating: false })
    })
  };

  updateUser = () => {
    const { name, dob, avatar } = this.state
    this.setState({ updating: true })
    this.props.updateUser({ avatar, name, dob }).then(({
      data: { updateUser }
    }) => {
      this.setState({ updating: false })
    })
  };

  render () {
    const { loading, currentUser } = this.props
    if (loading || !currentUser) {
      return (
        <View style={[styles.loading, styles.container]}>
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <Scene>
        <Spinner visible={this.state.updating} />
        <View style={styles.content}>
          <AvatarPicker
            selectedValue={currentUser.avatar_url}
            onSelect={this.handleAvatarSelect}
          />
          <View style={styles.info}>
            <TextInput
              value={this.state.name}
              onChangeText={this.handleNameChange}
              placeholder='Enter name'
              style={styles.input}
              onBlur={this.updateUser}
            />
            <DatePicker
              selectedValue={currentUser.dob}
              onSelect={this.handleDateChange}
            />
          </View>
        </View>
      </Scene>
    )
  }
}

Profile.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  auth: PropTypes.shape({
    loading: PropTypes.bool,
    jwt: PropTypes.string
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  updateUser: PropTypes.func,
  removeUserImage: PropTypes.func,
  currentUser: PropTypes.shape({
    name: PropTypes.string,
    dob: PropTypes.string,
    avatar: PropTypes.shape({
      filename: PropTypes.string,
      width: PropTypes.number,
      height: PropTypes.number
    }),
    avatar_url: PropTypes.string
  })
}

const userQuery = graphql(USER_QUERY, {
  skip: ownProps => !ownProps.auth || !ownProps.auth.jwt,
  options: () => ({
    fetchPolicy: 'cache-only'
  }),
  props: ({ data: { loading, currentUser } }) => ({
    loading,
    currentUser
  })
})

const updateUserMutation = graphql(UPDATE_USER_MUTATION, {
  props: ({ mutate }) => ({
    updateUser: user =>
      mutate({
        variables: { user },
        update: (store, { data: { updateUser } }) => {
          const userData = store.readQuery({
            query: USER_QUERY
          })

          userData.currentUser.dob = updateUser.dob
          userData.currentUser.avatar = updateUser.avatar
          userData.currentUser.avatar_url = updateUser.avatar_url
          userData.currentUser.name = updateUser.name

          store.writeQuery({
            query: USER_QUERY,
            data: userData
          })
        }
      })
  })
})

const removeUserImageMutation = graphql(REMOVE_USER_IMAGE_MUTATION, {
  props: ({ mutate }) => ({
    removeUserImage: user =>
      mutate({
        variables: { user }
      })
  })
})

const mapStateToProps = ({ auth }) => ({
  auth
})

export default compose(
  connect(mapStateToProps),
  updateUserMutation,
  removeUserImageMutation,
  userQuery
)(Profile)
