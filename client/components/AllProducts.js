import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/product'
import {Link} from 'react-router-dom'
import SearchBar from './SearchBar'
import CategoryList from './CategoryList'
import {fetchCategories} from '../store/allCategories'
import {makeOrder} from '../store/orders'
import Dropdown from 'react-dropdown'

const options = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

/**
 * COMPONENT
 */
import './styles/AllProducts.css'
class AllProducts extends React.Component {
  constructor() {
    super()
    this.state = {
      selected: ''
    }
    this.handleClick = this.handleClick.bind(this)
    this._onSelect = this._onSelect.bind(this)
  }
  componentDidMount() {
    this.props.fetchProducts()
    this.props.fetchCategories()
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
    const products = this.props.products
    const defaultOption = this.state.selected

    return (
      <div>
        <div id="filtering">
          <CategoryList />
          <SearchBar />
        </div>
        <div id="all-products-page">
          <div id="all-products">
            {products.map(product => (
              <div key={product.id} id="all-products-box">
                <img src={product.imageUrl} id="all-products-img" />
                <div id="all-products-info">
                  <Link to={`products/${product.id}`} id="all-products-title">
                    <h3
                    >{`${product.title[0].toUpperCase()}${product.title.slice(
                      1
                    )}`}</h3>
                  </Link>
                  <p id="all-products-price">Price: ${product.price / 100}</p>
                  <div id="all-products-review">
                    {!product.reviews.length ? (
                      <div>
                        <div>No reviews yet...</div>
                      </div>
                    ) : (
                      <div>
                        <div>Most recent review:</div>
                        <div>
                          {`${product.reviews[0].rating}/5  `}
                          <strong>{product.reviews[0].title}</strong>
                        </div>
                        <div>{product.reviews[0].description}</div>
                      </div>
                    )}
                  </div>
                  <div>
                    <div>
                      <button
                        type="button"
                        id="all-products-btn"
                        onClick={this.handleClick}
                        value={product.id}
                      >
                        Add to cart
                      </button>
                    </div>
                    <div>
                      <button type="button" id="all-products-btn">
                        <Dropdown
                          options={options}
                          onChange={this._onSelect}
                          value={defaultOption}
                          placeholder="Select a Quantity"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    products: state.products,
    user: state.currentUser
  }
}

const mapDispatch = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    fetchCategories: () => dispatch(fetchCategories()),
    makeOrder: (userId, productId) => dispatch(makeOrder(userId, productId))
  }
}
export default connect(mapState, mapDispatch)(AllProducts)
