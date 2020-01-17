import React, {Component} from 'react'
import {connect} from 'react-redux'
import {finishOrder} from '../store/orders'

export class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      state: '',
      zip: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit(event) {
    event.preventDefault()
    try {
      this.props.finishOrder(this.props.order.id)
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    console.log('props', this.props.order)
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Checkout</h2>
        <label htmlFor="firstName">First Name: </label>
        <input
          type="text"
          name="firstName"
          onChange={this.handleChange}
          value={this.state.firstName}
        />
        <label htmlFor="lastName">Last Name: </label>
        <input
          type="text"
          name="lastName"
          onChange={this.handleChange}
          value={this.state.lastName}
        />
        <label htmlFor="email">Email: </label>
        <input
          type="text"
          name="email"
          onChange={this.handleChange}
          value={this.state.email}
        />
        <label htmlFor="address">Address: </label>
        <input
          type="text"
          name="address"
          onChange={this.handleChange}
          value={this.state.address}
        />
        <label htmlFor="state">State: </label>
        <input
          type="text"
          name="state"
          onChange={this.handleChange}
          value={this.state.state}
        />
        <label htmlFor="zip">Zip: </label>
        <input
          type="text"
          name="zip"
          onChange={this.handleChange}
          value={this.state.zip}
        />
        <button type="submit" value="Submit">
          Place Order
        </button>
      </form>
    )
  }
}

const mapState = state => {
  return {
    order: state.order
  }
}

const mapDispatch = dispatch => {
  return {
    finishOrder: id => dispatch(finishOrder(id))
  }
}

export default connect(mapState, mapDispatch)(Checkout)
