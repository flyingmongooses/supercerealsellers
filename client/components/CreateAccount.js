import React from 'react'
import {connect} from 'react-redux'

import {postCurrentUser, updateUser} from '../store/currentUser'

import './styles/CreateAccount.css'
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
    console.log(this.props)
    if (!this.props.user) {
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
      this.props.history.push('/home')
    } else {
      const userId = this.props.user.id
      const user = this.state
      this.props.updateUser({userId, user})
      this.props.history.push('/home')
    }
  }

  render() {
    return (
      <div id="create-account">
        <h3>Create Account</h3>
        <form id="create-acc-form" onSubmit={this.handleSubmit}>
          <div className="inner-form-box">
            <label htmlFor="firstName">
              First Name
              <input
                required
                type="text"
                name="firstName"
                onChange={this.handleChange}
                value={this.state.firstName}
              />
            </label>
            <label htmlFor="lastName">
              Last Name
              <input
                required
                type="text"
                name="lastName"
                onChange={this.handleChange}
                value={this.state.lastName}
              />
            </label>
            <label htmlFor="email">
              Email
              <input
                required
                type="email"
                name="email"
                onChange={this.handleChange}
                value={this.state.email}
              />
            </label>
            <label htmlFor="password">
              Password
              <input
                required
                type="password"
                name="password"
                onChange={this.handleChange}
                value={this.state.password}
              />
            </label>
          </div>
          <div className="inner-form-box">
            <label htmlFor="address">
              Address
              <input
                required
                type="text"
                name="address"
                onChange={this.handleChange}
                value={this.state.address}
              />
            </label>
            <label htmlFor="city">
              City
              <input
                required
                type="text"
                name="city"
                onChange={this.handleChange}
                value={this.state.city}
              />
            </label>
            <label htmlFor="state">
              State
              <input
                required
                type="text"
                name="state"
                onChange={this.handleChange}
                value={this.state.state}
              />
            </label>
            <label htmlFor="zipcode">
              Zipcode
              <input
                required
                type="text"
                name="zipcode"
                onChange={this.handleChange}
                value={this.state.zipcode}
              />
            </label>
          </div>
          <button type="submit">Create Account</button>
        </form>
      </div>
    )
  }
}
const mapDispatch = dispatch => {
  return {
    addUser: user => dispatch(postCurrentUser(user)),
    updateUser: user => dispatch(updateUser(user))
  }
}
export default connect(state => {
  return {user: state.currentUser}
}, mapDispatch)(CreateAccount)
