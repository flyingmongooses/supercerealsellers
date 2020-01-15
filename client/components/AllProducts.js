import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/product'
import {Link} from 'react-router-dom'
import SearchBar from './SearchBar'

/**
 * COMPONENT
 */
class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    const products = this.props.products
    return (
      <div>
        <SearchBar />
        <div>
          <h1>All Products</h1>
        </div>
        {products.map(product => (
          <div key={product.id}>
            <Link to={`/products/${product.id}`}>
              <h3>{product.name}</h3>
            </Link>
            <p>{`${product.title[0].toUpperCase()}${product.title.slice(
              1
            )}`}</p>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <p>{product.inventory}</p>
            <img src={product.imageUrl} />
          </div>
        ))}
      </div>
      // <div>
      //   <h3>list of all products</h3>
      //   <h1>image, description? review rating? </h1>
      //   <h3> add to cart</h3>
      //   <h3> Quantity => dropdown list or form to input amount to purchase</h3>
      // </div>
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
