import React from 'react'
import {connect} from 'react-redux'
import {fetchOrder, removeProduct} from '../store/orders'

class Cart extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    this.props.fetchOrder(this.props.user.id)
  }
  handleClick(event) {
    console.log(event.target.value)
    this.props.removeProduct({
      id: this.props.user.id,
      productId: event.target.value
    })
  }
  render() {
    const {order} = this.props
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
        <h3>Button to Checkout</h3>
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
