import React, { Component } from 'react'
import {
  View,
  ActivityIndicator,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native'
import PropTypes from 'prop-types'

import without from 'lodash/without'
import concat from 'lodash/concat'

import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'

import { Ionicons } from '@expo/vector-icons'

import { Colors, Text, Paragraph, Scene, Button } from '../../components'

import { USER_QUERY } from '../../graphql/user.query'
import { CREATE_GROUP_MUTATION } from '../../graphql/group.mutation'

import BackButton from '../../navigation/BackButton'

import styles, { Separator, Footer, ListHeader } from './styles'

class NewGroup extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: BackButton(navigation)
  })

  state = {
    groupName: '',
    selected: []
  }

  renderItem = ({ item }) => {
    const isSelected = this.state.selected.includes(item)

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
        <View style={styles.contactRow__right}>
          <TouchableOpacity onPress={() => this.handleSelect(item)}>
            {
              isSelected
                ? <Ionicons size={30} color={Colors.blue} name='ios-checkbox' />
                : <Ionicons size={30} color={Colors.blue} name='ios-square-outline' />
            }
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  handleChange = (text) => {
    this.setState({
      groupName: text
    })
  }

  handleSelect = (item) => {
    const isSelected = this.state.selected.includes(item)

    if (isSelected) {
      this.setState({
        selected: without(this.state.selected, item)
      })
    } else {
      this.setState({
        selected: concat(this.state.selected, item)
      })
    }
  }

  createGroup = () => {
    this.props.createGroup({
      name: this.state.groupName,
      contactIds: this.state.selected.map(v => v.id)
    }).then((group) => {
      this.props.navigation.goBack()
    })
  }

  render () {
    const { groupName, selected } = this.state
    const { loading, currentUser } = this.props
    if (loading || !currentUser) {
      return (
        <Scene>
          <ActivityIndicator />
        </Scene>
      )
    }
    return (
      <Scene padding={15} flex>
        <TextInput
          placeholder='Group name'
          style={styles.groupNameInput}
          onChangeText={this.handleChange}
        />
        <Paragraph style={styles.groupSelectedPeople}>
          <Text style={styles.groupSelectedPeople__title}>Add people</Text>: {selected.map(v => v.name).join(', ')}
        </Paragraph>
        <ListHeader title='Contacts' />
        <FlatList
          ItemSeparatorComponent={Separator}
          keyExtractor={v => v.id}
          extraData={selected}
          renderItem={this.renderItem}
          data={currentUser.contacts}
        />
        <Footer>
          <Button
            text='Create Group'
            disabled={!groupName || !selected.length}
            onPress={this.createGroup}
            style={styles.createGroupButton}
          />
        </Footer>
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

const createGroup = graphql(CREATE_GROUP_MUTATION, {
  props: ({ ownProps, mutate }) => ({
    createGroup: group =>
      mutate({
        variables: { group },
        update: (store, { data: { createGroup } }) => {
          const userData = store.readQuery({
            query: USER_QUERY
          })

          userData.currentUser.groups.push(createGroup)

          store.writeQuery({
            query: USER_QUERY,
            data: userData
          })
        }
      })
  })
})

NewGroup.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func
  }),
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
  createGroup: PropTypes.func.isRequired
}

export default compose(connect(mapStateToProps), userQuery, createGroup)(NewGroup)
