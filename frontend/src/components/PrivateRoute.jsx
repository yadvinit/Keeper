import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const state = useSelector((state) => state)
  const { currentUser } = state.user || {}
  
  console.log('PrivateRoute - Full state:', state)
  console.log('PrivateRoute - currentUser:', currentUser)
  console.log('PrivateRoute - Has user?', !!currentUser)
  
  if (!currentUser) {
    console.log('Redirecting to login - no currentUser')
    return <Navigate to="/login" replace />
  }
  
  console.log('Rendering home - user is authenticated')
  return children
}

export default PrivateRoute
