import React from 'react'
import {searchStuff} from '../store/product'
import {connect} from 'react-redux'

class SearchBar extends React.Component {
  constructor() {
    super()
    this.state = {
      search: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }
  handleSubmit(event) {
    try {
      event.preventDefault()
      this.props.searchStuff()
    } catch (err) {
      console.log(err)
    }
  }
  render() {
    const {search} = this.state
    return (
      <div>
        <form>
          <div>
            <label htmlFor="search">Search Cereal</label>
            <input
              name="search"
              type="text"
              value={search}
              onChange={this.handleChange}
            />
          </div>
        </form>
      </div>
    )
  }
}
const mapDispatch = dispatch => {
  return {
    searchStuff: search => dispatch(searchStuff(search))
  }
}
export default connect(null, mapDispatch)(SearchBar)
