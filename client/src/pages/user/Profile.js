import React from 'react'
import UserMenu from './UserMenu'

function Profile() {
  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <UserMenu />
      </div>
      <div className="content">
        <h1>profile</h1>
      </div>
    </div>
  )
}

export default Profile