import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import currentUserReducer from './currentUser'
import productReducer from './product'
import usersReducer from './allUsers'
import singleProductReducer from './singleProduct'
import categoryReducer from './allCategories'
import singleCategoryReducer from './singleCategory'
import orderReducer from './orders'
import userOrderReducer from './userAllOrders'

///usersReducer is now unused, might need to look into naming convention for it///

export const reducer = combineReducers({
  currentUser: currentUserReducer,
  products: productReducer,
  product: singleProductReducer,
  users: usersReducer,
  categories: categoryReducer,
  category: singleCategoryReducer,
  order: orderReducer,
  userOrders: userOrderReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './currentUser'
