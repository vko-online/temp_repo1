import React, { Component } from 'react'
import { AsyncStorage, YellowBox } from 'react-native'

import { ApolloProvider } from 'react-apollo'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import ApolloClient from 'apollo-client'
import {
  SubscriptionClient,
  addGraphQLSubscriptions
} from 'subscriptions-transport-ws'
import { persistStore, autoRehydrate } from 'redux-persist'
import thunk from 'redux-thunk'
import _ from 'lodash'
import { createBatchingNetworkInterface } from 'apollo-upload-client'
import { createApolloFetch } from 'apollo-fetch'
import createSagaMiddleware from 'redux-saga'
import { MenuContext } from 'react-native-menu'

import AppWithNavigationState, { navigationReducer } from './navigation'
import auth from './reducers/auth'
import { logout } from './actions/auth'
import sagas from './sagas'

// todo: remove hack for `subscriptions-transport-ws` warning
YellowBox.ignoreWarnings(['Notice that addGraphQLSubscriptions'])

const URL = '192.168.1.232:8080' // set your comp's url here

const networkInterface = createBatchingNetworkInterface({
  uri: `http://${URL}/graphql`,
  batchInterval: 100,
  queryDeduplication: true
})

// middleware for requests
networkInterface.use([
  {
    applyBatchMiddleware (req, next) {
      if (!req.options.headers) {
        req.options.headers = {}
      }
      // get the authentication token from local storage if it exists
      const jwt = store.getState().auth.jwt
      if (jwt) {
        req.options.headers.authorization = `Bearer ${jwt}`
      }
      next()
    }
  }
])

// afterware for responses
networkInterface.useAfter([
  {
    applyBatchAfterware ({ responses }, next) {
      let isUnauthorized = false

      responses.forEach(response => {
        if (response.errors) {
          console.log('GraphQL Error:', response.errors)
          if (_.some(response.errors, { message: 'Unauthorized' })) {
            isUnauthorized = true
          }
        }
      })

      if (isUnauthorized) {
        store.dispatch(logout())
      }

      next()
    }
  }
])

export const fetch = createApolloFetch({
  uri: `http://${URL}/graphql`
})

fetch.use((req, next) => {
  if (!req.options.headers) {
    req.options.headers = {}
  }
  // get the authentication token from local storage if it exists
  const jwt = store.getState().auth.jwt
  if (jwt) {
    req.options.headers.authorization = `Bearer ${jwt}`
  }
  next()
})

// Create WebSocket client
export const wsClient = new SubscriptionClient(`ws://${URL}/subscriptions`, {
  reconnect: true,
  connectionParams () {
    // get the authentication token from local storage if it exists
    return { jwt: store.getState().auth.jwt }
  },
  lazy: true
})

// Extend the network interface with the WebSocket
const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
)

export const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions
})

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
  combineReducers({
    apollo: client.reducer(),
    nav: navigationReducer,
    auth
  }),
  {}, // initial state
  composeWithDevTools(
    applyMiddleware(client.middleware(), thunk, sagaMiddleware),
    autoRehydrate()
  )
)

sagaMiddleware.run(sagas)

// persistent storage
persistStore(store, {
  storage: AsyncStorage,
  blacklist: ['apollo', 'nav'] // don't persist apollo or nav for now
})

export default class App extends Component {
  render () {
    return (
      <ApolloProvider store={store} client={client}>
        <MenuContext style={{flex: 1}}>
          <AppWithNavigationState />
        </MenuContext>
      </ApolloProvider>
    )
  }
}
