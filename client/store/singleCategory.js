import axios from 'axios'

const SET_CATEGORY = 'SET_CATEGORY'

export const setCategory = category => {
  return {type: SET_CATEGORY, category}
}

export const fetchCategory = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/categories/${id}`)
      dispatch(setCategory(data))
    } catch (err) {
      console.log(err)
    }
  }
}

const singleCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_CATEGORY:
      return action.category
    default:
      return state
  }
}

export default singleCategoryReducer
