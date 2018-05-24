import { fork } from 'redux-saga/effects'

import contacts from './contacts'

export default function * root () {
  yield fork(contacts)
}
