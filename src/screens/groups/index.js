import React, { Component } from 'react'
import {
  View,
  ActivityIndicator,
  FlatList,
  Image,
  Alert
} from 'react-native'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import { Ionicons } from '@expo/vector-icons'
import Menu, { MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu'

import { Colors, Text, Scene, Button } from '../../components'

import { USER_QUERY } from '../../graphql/user.query'
import { DELETE_GROUP_MUTATION } from '../../graphql/group.mutation'

import styles, { ListHeader, Separator } from './styles'

const MAX_PERSON = 3

class Groups extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <Button onPress={() => navigation.navigate('NewGroup')} text='Create new group' />
    )
  })

  handleActionEvent = (event, item) => {
    if (event === 'delete') {
      Alert.alert(
        'Delete',
        `Are you sure you want to delete ${item.name} group?`,
        [
          {text: 'Yes', onPress: () => this.props.deleteGroup(item.id)},
          {text: 'Cancel', style: 'cancel'}
        ],
        { cancelable: false }
      )
    }
  }

  renderGroupItem = ({ item }) => {
    return (
      <View style={styles.groupRow}>
        <View style={styles.groupRow__left}>
          <Ionicons name='ios-people-outline' size={28} color={Colors.blue} />
          <Text style={styles.groupRow__title}>{item.name}</Text>
        </View>
        <View style={styles.groupRow__right}>
          {
            item.contacts.slice(0, MAX_PERSON).map(v => (
              <Image
                key={v.id}
                style={styles.groupRow__avatar}
                source={require('../../assets/avatar.jpeg')}
              />
            ))
          }
          {
            item.contacts.length > MAX_PERSON &&
              <Text style={styles.groupRow__count}>+{item.contacts.length - MAX_PERSON}</Text>
          }
          <Menu onSelect={(value) => this.handleActionEvent(value, item)}>
            <MenuTrigger>
              <Ionicons style={styles.actionButton} name='md-more' color={Colors.greyishBrown} size={24} />
            </MenuTrigger>
            <MenuOptions optionsContainerStyle={{ width: 100 }} renderOptionsContainer={(options) => <View>{options}</View>}>
              <MenuOption value={'delete'} style={styles.deleteAction}>
                <Text>Delete</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </View>
      </View>
    )
  }

  renderItem = ({ item }) => {
    return (
      <View style={styles.contactRow}>
        <View style={styles.contactRow__left}>
          <Image
            key={item.id}
            style={styles.contactRow__avatar}
            source={require('../../assets/avatar.jpeg')}
          />
          <Text style={styles.contactRow__title}>{item.name}</Text>
        </View>
      </View>
    )
  }

  render () {
    const { loading, currentUser } = this.props
    if (loading || !currentUser) {
      return (
        <Scene>
          <ActivityIndicator />
        </Scene>
      )
    }
    return (
      <Scene padding={15}>
        <ListHeader title='Groups' />
        <FlatList
          ItemSeparatorComponent={Separator}
          keyExtractor={v => v.id}
          renderItem={this.renderGroupItem}
          data={currentUser.groups}
          style={styles.list}
        />
        <ListHeader title='Contacts' />
        <FlatList
          ItemSeparatorComponent={Separator}
          keyExtractor={v => v.id}
          renderItem={this.renderItem}
          data={currentUser.contacts}
        />
      </Scene>
    )
  }
}

const mapStateToProps = ({ auth }) => ({
  auth
})

const userQuery = graphql(USER_QUERY, {
  skip: ownProps => !ownProps.auth || !ownProps.auth.jwt,
  props: ({
    data: { loading, currentUser },
    ownProps: { auth }
  }) => ({
    loading,
    currentUser
  })
})

const deleteGroup = graphql(DELETE_GROUP_MUTATION, {
  props: ({ ownProps, mutate }) => ({
    deleteGroup: id =>
      mutate({
        variables: { id },
        update: (store, { data: { createGroup } }) => {
          const userData = store.readQuery({
            query: USER_QUERY
          })

          userData.currentUser.groups = userData.currentUser.groups.filter(v => v.id !== id)

          store.writeQuery({
            query: USER_QUERY,
            data: userData
          })
        }
      })
  })
})

Groups.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    contacts: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      phone: PropTypes.string
    })),
    groups: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      contacts: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string,
        phone: PropTypes.string
      }))
    }))
  }),
  deleteGroup: PropTypes.func.isRequired
}

export default compose(connect(mapStateToProps), userQuery, deleteGroup)(Groups)
