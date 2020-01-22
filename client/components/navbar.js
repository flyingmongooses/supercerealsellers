import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {fetchOrder} from '../store/orders'
import logo from './styles/images/superCerealStore-SesameSt.png'

import './styles/NavBar.css'
const NavBar = ({handleClick, isLoggedIn}) => (
  <div id="navbar">
    <div id="logo">
      {isLoggedIn ? (
        <Link to="/home">
          <img src={logo} alt="logo image" />
        </Link>
      ) : (
        <Link to="/">
          <img src={logo} alt="logo image" />
        </Link>
      )}
      {/* <h2>The best place to get that hard to find cereal!</h2> */}
    </div>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <Link to="/products">All Products</Link>
          <Link to="/cart">Cart</Link>
          <Link id="logout-lnk" to="#" onClick={handleClick}>
            Logout
          </Link>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/create-account">Sign Up</Link>
        </div>
      )}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.currentUser.id,
    user: state.currentUser,
    order: state.order
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(NavBar)

/**
 * PROP TYPES
 */
NavBar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
