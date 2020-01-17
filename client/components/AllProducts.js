import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/product'
import {Link} from 'react-router-dom'
import SearchBar from './SearchBar'
import CategoryList from './CategoryList'
import {fetchCategories} from '../store/allCategories'
import {makeOrder} from '../store/orders'
import Dropdown from 'react-dropdown'

const options = [
  {value: '1', label: '1'},
  {value: '2', label: '2'},
  {value: '3', label: '3'},
  {value: '4', label: '4'},
  {value: '5', label: '5'},
  {value: '6', label: '6'},
  {value: '7', label: '7'},
  {value: '8', label: '8'},
  {value: '9', label: '9'},
  {value: '10', label: '10'}
]
const defaultOption = options[0]

/**
 * COMPONENT
 */
class AllProducts extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    this.props.fetchProducts()
    this.props.fetchCategories()
  }
  handleClick(event) {
    this.props.makeOrder({
      userId: this.props.user.id,
      productId: event.target.value
    })
  }
  render() {
    const products = this.props.products
    return (
      <div>
        <SearchBar />
        <div>
          <h1>All Products</h1>
        </div>
        <div id="all-products-page">
          <CategoryList />
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
                  <p>{product.description}</p>
                  <p>${product.price / 100}</p>
                  <p>{product.inventory}</p>
                  <p> review rating in stars or out of 5?</p>
                  <div id="all-products-btns">
                    <button
                      type="button"
                      onClick={this.handleClick}
                      value={product.id}
                    >
                      Add to cart
                    </button>
                    <div>
                      <p>Quantity</p>
                      <button>
                        <Dropdown
                          options={options}
                          onChange={this._onSelect}
                          value={defaultOption}
                          placeholder="Select an option"
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
