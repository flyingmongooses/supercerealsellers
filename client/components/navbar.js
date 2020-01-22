import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {fetchOrder} from '../store/orders'
import {fetchProducts} from '../store/product'
import logo from './styles/images/superCerealStore-SesameSt.png'

import './styles/NavBar.css'
const NavBar = props => {
  console.log(props)
  const {user} = props
  return (
    <div id="navbar">
      <div id="logo">
        <Link to="/">
          <img src={logo} alt="logo image" />
        </Link>
        {/* <h2>The best place to get that hard to find cereal!</h2> */}
      </div>
      <nav>
        {props.isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <Link to="/products" onClick={() => fetchProducts}>
              See All Products
            </Link>
            <Link to="/cart">Cart</Link>
            {props.isLoggedIn && user.firstName === 'Guest' ? (
              <Link to="/create-account">Sign Up</Link>
            ) : (
              <div> </div>
            )}
            <a href="#" onClick={props.handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/home">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/create-account">Sign Up</Link>
          </div>
        )}
      </nav>
    </div>
  )
}


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
    },
    fetchProducts: () => dispatch(fetchProducts)
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
