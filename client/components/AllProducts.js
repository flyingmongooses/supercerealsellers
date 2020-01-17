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
    console.log('You selected ', option.label)
    this.setState({selected: option})
  }
  render() {
    const products = this.props.products
    const defaultOption = this.state.selected
    console.log('state', this.state.selected)
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
                      <button>
                        <Dropdown
                          options={options}
                          onChange={this._onSelect}
                          value={defaultOption}
                          placeholder="Select an Quantity"
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
