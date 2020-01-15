import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import userReducer from './user'
import productReducer from './product'
import usersReducer from './allUsers'
import singleProductReducer from './singleProduct'

///usersReducer is now unused, might need to look into naming convention for it///

export const reducer = combineReducers({
  users: userReducer,
  products: productReducer,
  product: singleProductReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
