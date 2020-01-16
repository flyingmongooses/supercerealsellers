import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchCategory} from '../store/singleCategory'
import {withRouter} from 'react-router-dom'

class CategoryList extends React.Component {
  render() {
    return (
      <div>
        <h3 id="category-title">Search by Category</h3>
        <div id="category-all">
          {this.props.categories &&
            this.props.categories.map(category => {
              return (
                <Link
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
