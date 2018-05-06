import React from 'react'

const UserProfile = (props) => {
  const { userProfile } = props
  return (
    userProfile ? 
    <div className='container'>
      <img src={`${userProfile.picture.large}`} />
      <span>{`${userProfile.name.title}, ${userProfile.name.first}, ${userProfile.name.last}`}</span>
      <span>{userProfile.email}</span>
    </div>
    : <h1>Looks like you haven't selected a user</h1>
  )
}

export default UserProfile
