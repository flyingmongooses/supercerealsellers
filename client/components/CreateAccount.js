import React from 'react'
import {connect} from 'react-redux'

import {postUser} from '../store'

export class CreateAccount extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      address: '',
      city: '',
      state: '',
      zipcode: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.addUser({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      address: this.state.address,
      city: this.state.city,
      state: this.state.state,
      zipcode: this.state.zipcode
    })
    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      address: '',
      city: '',
      state: '',
      zipcode: ''
    })
  }

  render() {
    return (
      <div>
        <h2>Create Account</h2>
        <form onSubmit={this.handleSubmit}>
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
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            onChange={this.handleChange}
            value={this.state.password}
          />
          <label htmlFor="address">Address: </label>
          <input
            type="text"
            name="address"
            onChange={this.handleChange}
            value={this.state.address}
          />
          <label htmlFor="city">City: </label>
          <input
            type="text"
            name="city"
            onChange={this.handleChange}
            value={this.state.city}
          />
          <label htmlFor="state">State: </label>
          <input
            type="text"
            name="state"
            onChange={this.handleChange}
            value={this.state.state}
          />
          <label htmlFor="zipcode">Zipcode: </label>
          <input
            type="text"
            name="zipcode"
            onChange={this.handleChange}
            value={this.state.zipcode}
          />
          <input type="submit" value="Create Account" />
        </form>
      </div>
    )
  }
}

export default connect(null, dispatch => ({
  addUser: user => dispatch(postUser(user))
}))(CreateAccount)
