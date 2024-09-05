import React from 'react'
import UserMenu from './UserMenu'

function Orders() {
  return (
    <div className="dashboard">
      <div className="sidebar">
        <UserMenu />
      </div>
      <div className="content">
        <h1>Welcome to the Dashboard</h1>
      </div>
    </div>
  )
}

export default Orders