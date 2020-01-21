import React, {Component} from 'react'
import StripeCheckout from 'react-stripe-checkout'

export default class Stripe extends Component {
  constructor() {
    super()

    this.handleToken = this.handleToken.bind(this)
  }

  handleToken(token) {
    console.log(token)
  }

  render() {
    return (
      <StripeCheckout
        token={this.handleToken}
        stripeKey="pk_test_uJaU1CdbpoTkpuZfTdVBEuKR00IsZDvNd5"
        billingAddress
        shippingAddress
      />
    )
  }
}
