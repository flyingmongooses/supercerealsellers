import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CURRENT_USER = 'GET_CURRENT_USER'

const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER'

const ADD_CURRENT_USER = 'ADD_CURRENT_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getCurrentUser = user => ({type: GET_CURRENT_USER, user})

const removeCurrentUser = () => ({type: REMOVE_CURRENT_USER})

export const addCurrentUser = user => {
  return {
    type: ADD_CURRENT_USER,
    user
  }
}

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getCurrentUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getCurrentUser({error: authError}))
  }

  try {
    dispatch(getCurrentUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeCurrentUser())
    history.push('/')
  } catch (err) {
    console.error(err)
  }
}
export const postCurrentUser = data => {
  return async dispatch => {
    try {
      const response = await axios.post('/api/users', data)
      const newUser = response.data
      const user = addCurrentUser(newUser)
      dispatch(user)
    } catch (err) {
      console.log(err)
    }
  }
}

/**
 * REDUCER
 */
const currentUserReducer = (state = defaultUser, action) => {
  switch (action.type) {
    case GET_CURRENT_USER:
      return action.user
    case REMOVE_CURRENT_USER:
      return defaultUser
    case ADD_CURRENT_USER:
      return action.user
    default:
      return state
  }
}

export default currentUserReducer
