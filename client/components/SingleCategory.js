import React from 'react'
import {fetchCategory} from '../store/singleCategory'
import {connect} from 'react-redux'

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
            return <h4 key={product.id}>{product.title}</h4>
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
