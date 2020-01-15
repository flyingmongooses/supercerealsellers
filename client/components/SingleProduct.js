import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'

/**
 * COMPONENT
 */
class SingleProduct extends React.Component {
  componentDidMount() {
    let productId = this.props.location.pathname.slice(10)
    this.props.fetchSingleProduct(productId)
  }
  render() {
    const product = this.props.product
    console.log(product)
    return (
      <div>
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <p>${product.price / 100}</p>
        <p>{product.inventory}</p>
        <img src={product.imageUrl} />
        <h1>image, description, review ratings plus full review </h1>
        <h3> add to cart</h3>
        <h3> Quantity => dropdown list or form to input amount to purchase</h3>
      </div>
    )
  }
}

const mapState = state => {
  return {
    product: state.product
  }
}

const mapDispatch = dispatch => {
  return {
    fetchSingleProduct: id => dispatch(fetchSingleProduct(id))
  }
}
export default connect(mapState, mapDispatch)(SingleProduct)
