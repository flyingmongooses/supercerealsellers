import React from 'react'
import {connect} from 'react-redux'
import {fetchOrder, removeProduct} from '../store/orders'
import {Link} from 'react-router-dom'
import Stripe from './Stripe'

let totalPrice = 0
let totalItems = 0

class Cart extends React.Component {
  constructor() {
    super()

    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    this.props.fetchOrder(this.props.user.id)
    totalPrice = 0
    totalItems = 0
  }
  handleClick(event) {
    console.log(event.target.value)
    this.props.removeProduct({
      id: this.props.user.id,
      productId: event.target.value
    })
    totalItems = 0
    totalPrice = 0
  }
  render() {
    const {order} = this.props
    const productsInCart = this.props.order.products
    return (
      <div>
        <h1>Your Cart</h1>
        <div>
          <h3>
            {order.products &&
              order.products.map(product => {
                return (
                  <div key={product.id}>
                    <div>
                      {`${product.title[0].toUpperCase()}${product.title.slice(
                        1
                      )}`}{' '}
                    </div>
                    <div>${product.price / 100}</div>
                    <div>Qty: {product.order_items.quantity}</div>
                    <button
                      type="button"
                      onClick={this.handleClick}
                      value={product.id}
                    >
                      Delete
                    </button>
                  </div>
                )
              })}
          </h3>
        </div>
        <h3>
          {order.products &&
            order.products.map(product => {
              totalPrice += product.price * product.order_items.quantity
              totalItems += product.order_items.quantity
            })}
          Total({totalItems} Items): ${(totalPrice / 100).toFixed(2)}
        </h3>
        <Stripe />
        <Link to="/products">Continue Shopping</Link>
      </div>
    )
  }
}

const mapState = state => {
  return {order: state.order, user: state.currentUser}
}
const mapDispatch = dispatch => {
  return {
    fetchOrder: id => dispatch(fetchOrder(id)),
    removeProduct: id => dispatch(removeProduct(id))
  }
}
export default connect(mapState, mapDispatch)(Cart)
