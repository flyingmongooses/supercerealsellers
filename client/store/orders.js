import axios from 'axios'

const CREATE_ORDER = 'CREATE_ORDER'
const GET_ORDER = 'GET_ORDER'
const DELETE_PRODUCT = 'DELETE_PRODUCT'

const createOrder = order => {
  return {type: CREATE_ORDER, order}
}
const getOrder = order => {
  return {type: GET_ORDER, order}
}
const deleteProduct = productId => {
  return {type: DELETE_PRODUCT, productId}
}

export const makeOrder = info => {
  const {userId, productId} = info
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/orders', {userId, productId})
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
  console.log(info)
  const {id} = info
  let {productId} = info
  productId = Number(productId)
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/orders/delete`, {id, productId})
      console.log(data)
      if (data === 'OK') {
        dispatch(deleteProduct(productId))
      }
    } catch (err) {
      console.log(err)
    }
  }
}

const orderReducer = (state = {}, action) => {
  console.log('action', action.productId)
  switch (action.type) {
    case CREATE_ORDER:
      return action.order
    case GET_ORDER:
      return action.order
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(product => {
          console.log('product.id', product.id)
          return product.id !== action.productId
        })
      }
    default:
      return state
  }
}

export default orderReducer
