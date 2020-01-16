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
    console.log(this.props)
    this.props.makeOrder({
      userId: this.props.user.id,
      productId: event.target.value
    })
  }
  render() {
    const products = this.props.products
    console.log(this.props)
    return (
      <div>
        <SearchBar />
        <CategoryList />
        <div>
          <h1>All Products</h1>
        </div>
        {products.map(product => (
          <div key={product.id}>
            <Link to={`products/${product.id}`}>
              <h3>{`${product.title[0].toUpperCase()}${product.title.slice(
                1
              )}`}</h3>
            </Link>
            <p>{product.description}</p>
            <p>${product.price / 100}</p>
            <p>{product.inventory}</p>
            <p> review rating in stars or out of 5?</p>
            <button type="button" onClick={this.handleClick} value={product.id}>
              Add to cart
            </button>
            <p>Quantity => dropdown list or form to input amount to purchase</p>
            <button>add to cart</button>
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
            <img src={product.imageUrl} />
          </div>
        ))}
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
