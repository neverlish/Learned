import React from 'react'

const UserItem = (props) => (
  <div className='box'>
    <img src={props.user.picture.thumbnail} />
    <span>{props.user.login.username}</span>
  </div>
)

UserItem.propTypes = {
  user: React.PropTypes.object.isRequired
}

export default UserItem
