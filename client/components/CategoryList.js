import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchCategory} from '../store/singleCategory'

class CategoryList extends React.Component {
  render() {
    return (
      <div id="category-list">
        <p>Filter by Category:</p>
        <div id="categories">
          {this.props.categories &&
            this.props.categories.map(category => {
              return (
                <Link
                  id="category-item"
                  to={`categories/${category.id}`}
                  key={category.id}
                  onClick={this.handleClick}
                  value={category.id}
                >
                  {category.name}
                </Link>
              )
            })}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {categories: state.categories}
}
const mapDispatch = dispatch => {
  return {
    fetchCategory: id => dispatch(fetchCategory(id))
  }
}

export default withRouter(connect(mapState, mapDispatch)(CategoryList))
