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
    this.setState({[event.target.name]: event.target.value})
  }
  handleSubmit(event) {
    try {
      event.preventDefault()
      this.props.searchStuff(this.state.search)
    } catch (err) {
      console.log(err)
    }
  }
  render() {
    console.log(this.props)
    const {search} = this.state
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="search">Search Cereal</label>
            <input
              name="search"
              type="text"
              value={search}
              onChange={this.handleChange}
            />
            <button type="submit">Submit</button>
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
