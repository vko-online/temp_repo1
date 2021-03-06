import { call, takeLatest } from 'redux-saga/effects'
import Expo from 'expo'

import { SET_CURRENT_USER } from '../constants/actionTypes'
import IMPORT_CONTACTS_MUTATION from '../graphql/import-contacts.mutation'

import { setCurrentUser } from '../actions/auth'

import { fetch, store } from '../'

async function requestPermission () {
  return Expo.Permissions.askAsync(Expo.Permissions.CONTACTS)
}

async function getContacts () {
  return Expo.Contacts.getContactsAsync({
    fields: [
      Expo.Contacts.PHONE_NUMBERS
    ],
    pageSize: 100,
    pageOffset: 0
  })
}

function * fetchContacts () {
  const permission = yield call(requestPermission)

  if (permission.status !== 'granted') {
    // Permission was denied...
  } else {
    const rawContacts = yield call(getContacts)

    const contacts = rawContacts.data.map(c => ({
      name: c.name,
      phone: c.phoneNumbers[0].digits
    }))

    fetch({
      query: IMPORT_CONTACTS_MUTATION,
      variables: {
        contacts
      }
    }).then(result => {
      const contacts = result.data.importContacts
      const user = store.getState().auth
      user.contacts = contacts
      store.dispatch(setCurrentUser(user))
    })
  }
}

function * contacts () {
  yield takeLatest(SET_CURRENT_USER, fetchContacts)
}

export default contacts
