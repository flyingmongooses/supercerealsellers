import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'
import {makeOrder} from '../store/orders'
import Dropdown from 'react-dropdown'

const options = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

/**
 * COMPONENT
 */
class SingleProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      selected: ''
    }
    this.handleClick = this.handleClick.bind(this)
    this._onSelect = this._onSelect.bind(this)
  }
  componentDidMount() {
    let productId = this.props.location.pathname.slice(10)
    this.props.fetchSingleProduct(productId)
  }
  handleClick(event) {
    let quantity = parseInt(this.state.selected.value)
    if (!quantity) {
      quantity = 1
    }
    this.props.makeOrder({
      userId: this.props.user.id,
      productId: event.target.value,
      quantity
    })
    this.setState({selected: ''})
  }
  _onSelect(option) {
    this.setState({selected: option})
  }
  render() {
    const product = this.props.product
    const defaultOption = this.state.selected
    console.log('product', product)
    return (
      <div>
        <h1>{product.title}</h1>
        <img src={product.imageUrl} id="all-products-img" />
        <p>{product.description}</p>
        <p>${product.price / 100}</p>
        <p>{product.inventory}</p>
        <button type="button" onClick={this.handleClick} value={product.id}>
          Add to cart
        </button>
        <div>
          <button>
            <Dropdown
              options={options}
              onChange={this._onSelect}
              value={defaultOption}
              placeholder="Select a Quantity"
            />
          </button>
        </div>
        <h3>Customer Reviews</h3>
        <div>
          {product.reviews &&
            product.reviews.map(review => {
              return (
                <div key={review.id}>
                  <div>
                    {`${review.rating}/5  `}
                    <strong>{review.title}</strong>
                  </div>
                  <p>{review.description}</p>
                </div>
              )
            })}
          {product.reviews && product.reviews.length === 0 ? (
            <div>
              <div>No reviews yet...</div>
              <button>Click here to write a review!</button>
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    product: state.product,
    user: state.currentUser
  }
}

const mapDispatch = dispatch => {
  return {
    fetchSingleProduct: id => dispatch(fetchSingleProduct(id)),
    makeOrder: (userId, productId) => dispatch(makeOrder(userId, productId))
  }
}
export default connect(mapState, mapDispatch)(SingleProduct)
