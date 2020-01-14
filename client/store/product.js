import axios from 'axios'

/**
 * ACTION TYPES
 */
const SET_PRODUCTS = 'SET_PRODUCTS'
const GET_NEW_PRODUCT = 'GET_NEW_PRODUCT'

// /**
//  * INITIAL STATE
//  */
// const defaultUser = {}

/**
 * ACTION CREATORS
 */

export const setProducts = products => {
  return {type: SET_PRODUCTS, products}
}

export const getProduct = product => {
  return {type: GET_NEW_PRODUCT, product}
}

/**
 * THUNK CREATORS
 */
export const fetchProducts = () => {
  return async dispatch => {
    const response = await axios.get('/api/products')
    const action = setProducts(response.data)
    dispatch(action)
  }
}

/**
 * REDUCER
 */

const productReducer = (state = [], action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products
    case GET_NEW_PRODUCT:
      return [...state, action.product]
    default:
      return state
  }
}

export default productReducer
