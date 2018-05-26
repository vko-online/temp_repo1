import gql from 'graphql-tag'

// get the user and all user's groups
export const USER_QUERY = gql`
  query currentUser {
    currentUser {
      id
      avatar {
        filename
        width
        height
      }
      avatar_url
      phone
      dob
      name
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
      name
      phone
      avatar {
        filename
        width
        height
      }
      avatar_url
      dob
    }
  }
`
