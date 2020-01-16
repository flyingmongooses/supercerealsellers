import React from 'react'
import {Link} from 'react-router-dom'
// import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {postUser} from '../store/user'

class Main extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome to Super Cereal Sellers!</h1>
        <button>
          <Link to="/login">Login</Link>
        </button>
        <button>
          <Link to="/signup">Sign Up</Link>
        <button
          onClick={() => {
            console.log('button')
            this.props.postUser({
              firstName: 'Guest',
              lastName: 'Guest'
            })
          }}
        >
          Continue as Guest
        </button>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    postUser: data => dispatch(postUser(data))
  }
}
export default connect(null, mapDispatch)(Main)
