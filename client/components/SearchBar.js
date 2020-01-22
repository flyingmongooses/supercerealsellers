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
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value}, this.searchHelper)
    // this.props.searchStuff(this.state.search.toLowerCase())
  }
  searchHelper() {
    this.props.searchStuff(this.state.search.toLowerCase())
  }
  handleSubmit(event) {
    try {
      event.preventDefault()
      this.props.searchStuff(this.state.search.toLowerCase())
    } catch (err) {
      console.log(err)
    }
  }
  render() {
    const {search} = this.state
    return (
      <div id="search-box">
        <p>Search for your favorite Cereal:</p>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              name="search"
              type="text"
              value={search}
              onChange={this.handleChange}
            />
            <button id="search-button" type="submit">
              Search
            </button>
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
