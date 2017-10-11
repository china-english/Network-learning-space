import React from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

export function requireAuthentication (Component) {
  class AuthenticatedComponent extends React.Component {
    componentWillMount () {
      this.checkAuth()
    }

    componentWillReceiveProps () {
      this.checkAuth()
    }

    checkAuth () {
      if (!this.props.isAuthenticated) {
        const redirectAfterLogin = this.props.location.pathname
        this.props.dispatch(push(`/login?next=${redirectAfterLogin}`))
      }
    }

    render () {
      return (
        <div>
          {this.props.isAuthenticated === true
            ? <Component {...this.props} />
            : null
          }
        </div>
      )
    }
  }

  AuthenticatedComponent.propTypes = {
    isAuthenticated: React.PropTypes.bool.isRequired,
    location: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired
  }

  const mapStateToProps = (state) => {
    return {
      isAuthenticated: state.auth.isAuthenticated,
      token: state.auth.token
    }
  }

  return connect(mapStateToProps)(AuthenticatedComponent)
}
