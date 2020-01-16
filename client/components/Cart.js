import React from 'react'
import {connect} from 'react-redux'

const Cart = props => {
  const {order} = props
  console.log(props)
  return (
    // <div>Hi</div>
    <div>
      <h1>Your Cart</h1>
      <div>
        <h3>
          {order.products &&
            order.products.map(product => {
              return <h3 key={product.id}>{product.title} </h3>
            })}
        </h3>
        {/* <div>Item 1</div>
        <div>Item 1 price and quantity in cart</div>
        <div>Item 2</div>
        <div>Item 2 price and quantity in cart</div> */}
      </div>
      <h3>Button to Checkout</h3>
    </div>
  )
}

const mapState = state => {
  return {order: state.order}
}
export default connect(mapState)(Cart)
