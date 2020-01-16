import axios from 'axios'

const CREATE_ORDER = 'CREATE_ORDER'

const createOrder = order => {
  return {type: CREATE_ORDER, order}
}

export const makeOrder = id => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/orders', id)
      dispatch(createOrder(data))
    } catch (err) {
      console.log(err)
    }
  }
}

const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER:
      return action.order
    default:
      return state
  }
}

export default orderReducer
