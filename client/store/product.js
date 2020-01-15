import axios from 'axios'

/**
 * ACTION TYPES
 */
const SET_PRODUCTS = 'SET_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'
const SEARCH_PRODUCTS = 'SEARCH_PRODUCTS'

/**
 * ACTION CREATORS
 */

export const setProducts = products => {
  return {type: SET_PRODUCTS, products}
}

export const addProduct = product => {
  return {type: ADD_PRODUCT, product}
}
export const searchProducts = products => {
  return {type: SEARCH_PRODUCTS, products}
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

export const searchStuff = searchQuery => {
  return async dispatch => {
    try {
      console.log(searchQuery)
      const {data} = await axios.get(`/api/search?search=${searchQuery}`)
      dispatch(searchProducts(data))
    } catch (err) {
      console.log(err)
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
    case SEARCH_PRODUCTS:
      return action.products
    default:
      return state
  }
}

export default productReducer
