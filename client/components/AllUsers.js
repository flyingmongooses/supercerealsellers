import React from 'react'
import {connect} from 'react-redux'

const AllUsers = props => {
  const {users} = props
  return users.length ? (
    <div>
      {users.map(user => {
        return (
          <div key={user.id}>{`${user.firstName} ${user.lastName} Email: ${
            user.email
          }`}</div>
        )
      })}
    </div>
  ) : (
    <div>HI!</div>
  )
}
const mapState = state => {
  return {
    users: state.users
  }
}

export default connect(mapState)(AllUsers)
