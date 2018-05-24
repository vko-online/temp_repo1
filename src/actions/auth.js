import { client, wsClient } from '../'
import { SET_CURRENT_USER, LOGOUT } from '../constants/actionTypes'

export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user
})

export const logout = () => {
  setTimeout(client.resetStore)
  wsClient.unsubscribeAll() // unsubscribe from all subscriptions
  wsClient.close() // close the WebSocket connection
  return { type: LOGOUT }
}
