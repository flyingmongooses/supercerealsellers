import axios from 'axios'

/**
 * ACTION TYPES
 */
const SET_PRODUCTS = 'SET_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'

/**
 * ACTION CREATORS
 */

export const setProducts = products => {
  return {type: SET_PRODUCTS, products}
}

export const addProduct = product => {
  return {type: ADD_PRODUCT, product}
}

/**
 * THUNK CREATORS
 */
export const fetchProducts = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/products')
      const action = setProducts(response.data)
      dispatch(action)
    } catch (err) {
      console.error(err)
    }
  }
}

/**
 * REDUCER
 */

const productReducer = (state = [], action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products
    case ADD_PRODUCT:
      return [...state, action.product]
    default:
      return state
  }
}

export default productReducer
