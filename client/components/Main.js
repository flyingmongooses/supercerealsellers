import React from 'react'
import {Link} from 'react-router-dom'
// import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {postCurrentUser} from '../store/currentUser'

import './styles/Main.css'
class Main extends React.Component {
  render() {
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
        <button
          type="button"
          onClick={() => {
            console.log('button')
            this.props.postUser({
              firstName: 'Guest',
              lastName: 'Guest',
              email: 'guest@gmail.com',
              password: 'guest',
              address: '100 Main',
              city: 'Chicago',
              state: 'IL',
              zipcode: '60622'
            })
          }}
        >
          <Link to="#">Continue as a Guest</Link>
        </button>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    postUser: data => dispatch(postCurrentUser(data))
  }
}
export default connect(null, mapDispatch)(Main)
