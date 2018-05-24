import gql from 'graphql-tag'

export const CREATE_GROUP_MUTATION = gql`
  mutation createGroup($group: CreateGroupInput!) {
    createGroup(group: $group) {
      id
      name
      contacts {
        id
        name
        phone
      }
    }
  }
`

export const DELETE_GROUP_MUTATION = gql`
  mutation deleteGroup($id: String!) {
    deleteGroup(id: $id) {
      id
    }
  }
`
