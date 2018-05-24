import gql from 'graphql-tag'

const CREATE_DECISION_MUTATION = gql`
  mutation importContacts($contacts: [CreateContactInput]!) {
    importContacts(contacts: $contacts) {
      id
      name
      phone
    }
  }
`

export default CREATE_DECISION_MUTATION
