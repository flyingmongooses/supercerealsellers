import axios from 'axios'

const GET_ALL_USER_ORDERS = 'GET_ALL_USER_ORDERS'

const getUserOrders = userOrders => {
  return {type: GET_ALL_USER_ORDERS, userOrders}
}

export const fetchAllUserOrders = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/orders/user-order/${id}`)
      dispatch(getUserOrders(data))
    } catch (err) {
      console.log(err)
    }
  }
}

const userOrderReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_USER_ORDERS:
      return action.userOrders
    default:
      return state
  }
}

export default userOrderReducer
