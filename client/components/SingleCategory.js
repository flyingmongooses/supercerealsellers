import React from 'react'
import {fetchCategory} from '../store/singleCategory'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class SingleCategory extends React.Component {
  componentDidMount() {
    this.props.fetchCategory(this.props.match.params.id)
  }
  render() {
    console.log(this.props)
    const {category} = this.props
    return (
      <div>
        <h1>{category.name}</h1>
        {category.products &&
          category.products.map(product => {
            return (
              <Link to={`/products/${product.id}`} key={product.id}>
                {product.title}
              </Link>
            )
          })}
      </div>
    )
  }
}
const mapState = state => {
  return {category: state.category}
}
const mapDispatch = dispatch => {
  return {
    fetchCategory: id => dispatch(fetchCategory(id))
  }
}

export default connect(mapState, mapDispatch)(SingleCategory)
