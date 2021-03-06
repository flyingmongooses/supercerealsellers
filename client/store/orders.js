import axios from 'axios'

const CREATE_ORDER = 'CREATE_ORDER'
const GET_ORDER = 'GET_ORDER'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const COMPLETE_ORDER = 'COMPLETE_ORDER'

const createOrder = order => {
  return {type: CREATE_ORDER, order}
}
const getOrder = order => {
  return {type: GET_ORDER, order}
}
const deleteProduct = productId => {
  return {type: DELETE_PRODUCT, productId}
}
const completeOrder = order => {
  return {type: COMPLETE_ORDER, order}
}

export const makeOrder = info => {
  const {userId, productId, quantity} = info
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/orders', {
        userId,
        productId,
        quantity
      })
      dispatch(createOrder(data))
    } catch (err) {
      console.log(err)
    }
  }
}
export const fetchOrder = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/orders/user/${id}`)
      dispatch(getOrder(data))
    } catch (err) {
      console.log(err)
    }
  }
}
export const removeProduct = info => {
  const {id} = info
  let {productId} = info
  productId = Number(productId)
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/orders/delete`, {id, productId})
      if (data === 'OK') {
        dispatch(deleteProduct(productId))
      }
    } catch (err) {
      console.log(err)
    }
  }
}
export const finishOrder = id => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/orders/${id}`)
      console.log('data', data)
      dispatch(completeOrder(data))
    } catch (err) {
      console.log(err)
    }
  }
}

const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER:
      return action.order
    case GET_ORDER:
      return action.order
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(product => {
          return product.id !== action.productId
        })
      }
    case COMPLETE_ORDER:
      return action.order
    default:
      return state
  }
}

export default orderReducer
