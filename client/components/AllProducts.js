import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/product'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    const products = this.props.products
    console.log(this.props)
    return (
      <div>
        <div>
          <h1>All Products</h1>
        </div>
        {products.map(product => (
          <div key={product.id}>
            <Link to={`products/${product.id}`}>
              <h3>{product.title}</h3>
            </Link>
            <p>{product.description}</p>
            <p>${product.price / 100}</p>
            <p>{product.inventory}</p>
            <p> review rating in stars or out of 5?</p>
            <button>add to cart</button>
            <p>Quantity => dropdown list or form to input amount to purchase</p>
            <img src={product.imageUrl} />
          </div>
        ))}
      </div>
    )
  }
}

const mapState = state => {
  return {
    products: state.products
  }
}

const mapDispatch = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts())
  }
}
export default connect(mapState, mapDispatch)(AllProducts)
