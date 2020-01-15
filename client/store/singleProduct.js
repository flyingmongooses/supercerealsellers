import axios from 'axios'

/**
 * ACTION TYPES
 */
const SET_SINGLE_PRODUCT = 'SET_SINGLE_PRODUCT'

/**
 * ACTION CREATORS
 */

export const setSingleProduct = product => {
  return {type: SET_SINGLE_PRODUCT, product}
}

/**
 * THUNK CREATORS
 */
export const fetchSingleProduct = id => {
  return async dispatch => {
    try {
      const response = await axios.get(`/api/products/${id}`)
      const action = setSingleProduct(response.data)
      dispatch(action)
    } catch (err) {
      console.error(err)
    }
  }
}

/**
 * REDUCER
 */

const singleProductReducer = (state = [], action) => {
  switch (action.type) {
    case SET_SINGLE_PRODUCT:
      return action.product
    default:
      return state
  }
}

export default singleProductReducer
