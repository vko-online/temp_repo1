import React, { Component } from 'react'
import {
  View
} from 'react-native'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'

import { Heading1 } from '../../components'

import { USER_QUERY } from '../../graphql/user.query'

import { Container } from './styles'

class Home extends Component {
  render () {
    return (
      <Container>
        <Heading1>Home screen</Heading1>
        {
          this.props.currentUser && (<View>
            <Heading1>{this.props.currentUser.contacts.map(v => v.name).join(', ')}</Heading1>
          </View>)
        }
      </Container>
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

Home.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    contacts: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      phone: PropTypes.string
    }))
  })
}

export default compose(connect(mapStateToProps), userQuery)(Home)
