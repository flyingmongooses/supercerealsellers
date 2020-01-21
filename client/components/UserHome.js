import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchAllUserOrders} from '../store/userAllOrders'
import './styles/UserHome.css'

/**
 * COMPONENT
 */
class UserHome extends Component {
  componentDidMount() {
    this.props.fetchAllUserOrders(this.props.user.id)
  }
  render() {
    const {email} = this.props
    const userOrders = this.props.userOrders

    return (
      <div>
        <div>
          <h2>Welcome, {email}</h2>
        </div>
        <div id="user-home-orders">
          <h2 id="user-home-title">Your Orders</h2>
          {userOrders.length ? (
            userOrders.map(order => {
              return (
                <div key={order.id} id="user-home-order-info">
                  <h3>Order Id: {order.id}</h3>
                  <h3>Order Status: {order.status.toUpperCase()}</h3>
                  {order.products.map(product => {
                    return (
                      <div key={product.id}>
                        <div>
                          <strong>{product.title}</strong>
                          {`, Quantity: ${product.order_items.quantity}`}
                        </div>
                        <div>{product.description}</div>
                        <br />
                      </div>
                    )
                  })}
                </div>
              )
            })
          ) : (
            <div>No Recent Orders</div>
          )}
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */

const mapState = state => {
  return {
    userOrders: state.userOrders,
    user: state.currentUser,
    email: state.currentUser.email
  }
}

const mapDispatch = dispatch => {
  return {
    fetchAllUserOrders: id => dispatch(fetchAllUserOrders(id))
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
