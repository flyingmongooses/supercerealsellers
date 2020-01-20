import React from 'react'
import {connect} from 'react-redux'
import {newReview} from '../store/singleProduct'

class AddReview extends React.Component {
  constructor() {
    super()
    this.state = {
      rating: 5,
      description: '',
      title: ''
    }
    this.handleChangeStars = this.handleChangeStars.bind(this)
    this.handleChangeReview = this.handleChangeReview.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChangeStars(event) {
    this.setState({[event.target.name]: event.target.value})
  }
  handleChangeReview(event) {
    this.setState({[event.target.name]: event.target.value})
    console.log(this.state)
  }
  handleSubmit(event) {
    event.preventDefault()
    const {id} = this.props.product
    const userId = this.props.user.id
    const review = this.state
    this.props.newReview({id, userId, review})
  }
  render() {
    const {rating, description, title} = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <form onChange={this.handleChangeStars} value={rating}>
          <label>
            <input type="radio" name="rating" value="1" />
            <span className="icon">★</span>
          </label>
          <label>
            <input type="radio" name="rating" value="2" />
            <span className="icon">★</span>
            <span className="icon">★</span>
          </label>
          <label>
            <input type="radio" name="rating" value="3" />
            <span className="icon">★</span>
            <span className="icon">★</span>
            <span className="icon">★</span>
          </label>
          <label>
            <input type="radio" name="rating" value="4" />
            <span className="icon">★</span>
            <span className="icon">★</span>
            <span className="icon">★</span>
            <span className="icon">★</span>
          </label>
          <label>
            <input type="radio" name="rating" value="5" />
            <span className="icon">★</span>
            <span className="icon">★</span>
            <span className="icon">★</span>
            <span className="icon">★</span>
            <span className="icon">★</span>
          </label>
        </form>
        <form onChange={this.handleChangeReview}>
          <label href="title">Name your review:</label>
          <input type="text" name="title" value={title} />
          <label href="description">Add Review</label>
          <textarea name="description" value={description} />
        </form>
        <button type="submit">Submit</button>
      </form>
    )
  }
}

const mapState = state => {
  return {
    user: state.currentUser,
    product: state.product
  }
}

const mapDispatch = dispatch => {
  return {
    newReview: review => dispatch(newReview(review))
  }
}

export default connect(mapState, mapDispatch)(AddReview)
