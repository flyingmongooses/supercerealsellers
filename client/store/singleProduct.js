import axios from 'axios'

/**
 * ACTION TYPES
 */
const SET_SINGLE_PRODUCT = 'SET_SINGLE_PRODUCT'
const ADD_REVIEW = 'ADD_REVIEW'
/**
 * ACTION CREATORS
 */

export const setSingleProduct = product => {
  return {type: SET_SINGLE_PRODUCT, product}
}
export const addReview = review => {
  return {type: ADD_REVIEW, review}
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

export const newReview = info => {
  return async dispatch => {
    try {
      const {id, userId, review} = info
      const {data} = await axios.post(`/api/products/reviews/${id}`, {
        userId,
        review
      })
      data.productId = id
      data.userId = userId
      dispatch(addReview(data))
    } catch (err) {
      console.log(err)
    }
  }
}
/**
 * REDUCER
 */

const singleProductReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_SINGLE_PRODUCT:
      return action.product
    case ADD_REVIEW:
      return {...state, reviews: [...state.reviews, action.review]}
    default:
      return state
  }
}

export default singleProductReducer
