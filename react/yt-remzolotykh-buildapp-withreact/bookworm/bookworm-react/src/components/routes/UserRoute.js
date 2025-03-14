import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

const UserRoute = ({ isAuthenticated, component: Component, ...rest }) => (
  <Route 
    {...rest} 
    render={props => 
      isAuthenticated ? <Component {...props} /> : <Redirect to='/' /> }
   />
)

UserRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token
  }
}

export default connect(mapStateToProps)(UserRoute)
