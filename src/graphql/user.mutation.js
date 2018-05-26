import gql from 'graphql-tag'

export const UPDATE_USER_MUTATION = gql`
  mutation updateUser($user: UpdateUserInput!) {
    updateUser(user: $user) {
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
    }
  }
`
export const REMOVE_USER_IMAGE_MUTATION = gql`
  mutation removeUserImage($user: RemoveUserImageInput!) {
    removeUserImage(user: $user) {
      id
      avatar {
        filename
        width
        height
      }
      name
      dob
    }
  }
`
