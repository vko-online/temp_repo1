import gql from 'graphql-tag'

// get the user and all user's groups
export const USER_QUERY = gql`
  query currentUser {
    currentUser {
      id
      phone
      groups {
        id
        name
        contacts {
          id
          name
          phone
        }
      }
      contacts {
        id
        name
        phone
      }
    }
  }
`

export const USER_ALL_QUERY = gql`
query users ($text: String) {
  users (text: $text) {
    id
    phone
  }
}
`
