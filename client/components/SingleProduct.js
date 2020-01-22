import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'
import {makeOrder} from '../store/orders'
import Dropdown from 'react-dropdown'
import AddReview from './AddReview'

const options = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

/**
 * COMPONENT
 */
import './styles/SingleProduct.css'
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
    let quantity = parseInt(this.state.selected.value, 10)
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
    const reviews = this.props.product.reviews

    return (
      <div id="single-product-container">
        {/* PRODUCT IMAGE */}
        <div id="single-image">
          <img src={product.imageUrl} alt={product.title} />
        </div>
        {/* PRODUCT INFORMATION */}
        <div id="product-info">
          <h2>{product.title}</h2>
          <hr />
          <div>
            <p>
              <small>Description:</small>
            </p>
            <p>{product.description}</p>
          </div>
          <hr />
          <p>
            Inventory:{' '}
            {product.inventory < 101
              ? `${product.inventory} remaining`
              : 'Available'}
            <br />
            <small>Shipped and packed by Flying Mongooses</small>
          </p>

          <button
            type="button"
            onClick={() =>
              alert(
                'Flying mongooses are adding your item to your wishlist...if someone implements that feature :)'
              )
            }
          >
            Add to Wishlist
          </button>
        </div>
        {/* CART, QUANTITY, WISHLIST */}
        <div id="add-to-cart-quantity">
          <p id="price">
            <span>Price: </span>
            <strong>${product.price / 100}</strong>
          </p>
          <button
            id="add-to-cart-btn"
            type="button"
            onClick={this.handleClick}
            value={product.id}
          >
            Add to Cart
          </button>
          <button type="button">
            <Dropdown
              options={options}
              onChange={this._onSelect}
              value={defaultOption}
              placeholder="Select a Quantity"
            />
          </button>
        </div>
        {/* REVIEWS */}
        <div id="reviews">
          <h3>Customer Reviews</h3>
          <div>
            {reviews && reviews.length > 0 ? (
              reviews.map(review => {
                console.log(review.user)
                return (
                  <div id="review" key={review.id}>
                    <p>
                      Rated <mark>{review.rating} out of 5</mark> by{' '}
                      <mark>
                        {review.user
                          ? `${review.user.firstName} ${review.user.lastName}`
                          : 'User Anonymous'}
                      </mark>
                    </p>
                    <strong>{review.title}</strong>
                    <p>{review.description}</p>
                  </div>
                )
              })
            ) : (
              <div>
                <div>No Customer Reviews Yet...</div>
                <div> Be the first to add one! </div>
                {/* this could be a good place to add a link to make a review */}
              </div>
            )}
          </div>
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
