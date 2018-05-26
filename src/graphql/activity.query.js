import gql from 'graphql-tag'

export const ACTIVITY_ALL_QUERY = gql`
  query activities {
    activities {
      id
      image {
        filename
        width
        height
      }
      image_url
      title
      description
      created_at
      start_date
    }
  }
`
export const ACTIVITY_QUERY = gql`
  query activity($id: String!) {
    activity(id: $id) {
      id
      image {
        filename
        width
        height
      }
      image_url
      title
      description
      created_at
      start_date
      end_date
      created_by {
        id
        name
        phone
        avatar {
          filename
          width
          height
        }
        avatar_url
      }

      min_payment
      min_people
      require_people_decision

      people_invited {
        id
        name
        phone
        avatar {
          filename
          width
          height
        }
        avatar_url
      }
      people_seen_by {
        id
        name
        phone
        avatar {
          filename
          width
          height
        }
        avatar_url
      }
      people_going {
        id
        name
        phone
        avatar {
          filename
          width
          height
        }
        avatar_url
      }
      people_maybe_going {
        id
        name
        phone
        avatar {
          filename
          width
          height
        }
        avatar_url
      }
      people_not_going {
        id
        name
        phone
        avatar {
          filename
          width
          height
        }
        avatar_url
      }
      messages {
        id
        created_by {
          id
          name
          phone
          avatar {
            filename
            width
            height
          }
          avatar_url
        }
        created_at
        content
      }
    }
  }
`
