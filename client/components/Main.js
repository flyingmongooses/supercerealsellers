import React from 'react'
import {Link} from 'react-router-dom'
// import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {postCurrentUser} from '../store/currentUser'

import './styles/Main.css'
class Main extends React.Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event) {
    console.log('button')
    this.props.postUser({
      firstName: 'Guest',
      lastName: 'Guest',
      email: 'guest@gmail.com',
      password: 'guest',
      address: '100 Main',
      city: 'Chicago',
      state: 'IL',
      zipcode: '60622',
      role: 'guest'
    })
    //login guest user with a thunk??
    //redirect to all products page
    this.props.history.push('/products')
  }
  render() {
    console.log('props', this.props)
    if (!this.props.user.id) {
      return (
        <div id="main">
          <h1>Welcome to Super Cereal Sellers!</h1>
          <button type="button">
            <Link to="/login">Login</Link>
          </button>
          <button type="button">
            <Link to="/create-account">Sign Up</Link>
          </button>
          <p>or</p>
          <button type="button" onClick={this.handleClick}>
            <Link to="/products">Continue as a Guest</Link>
          </button>
        </div>
      )
    } else {
      return (
        <div>
          <div>You're already logged in</div>
          <Link to="/products">See all products</Link>
        </div>
      )
    }
  }
}
const mapState = state => {
  return {
    user: state.currentUser
  }
}
const mapDispatch = dispatch => {
  return {
    postUser: data => dispatch(postCurrentUser(data))
  }
}
export default connect(mapState, mapDispatch)(Main)
