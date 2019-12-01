import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Mutation } from "react-apollo"
import { gql } from 'apollo-boost'
import { ROOT_QUERY } from './App'

const GITHUB_AUTH_MUTATION = gql`
  mutation githubAuth($code: String!) {
    githubAuth(code: $code) { token }
  }
`

class AuthorizedUser extends Component {
  state = { signingIn: false }

  authorizationComplete = (cache, { data }) => {
    localStorage.setItem('token', data.githubAuth.token)
    this.props.history.replace('/')
    this.setState({ signingIn: false })
  }

  componentDidMount() {
    if (window.location.search.match(/code=/)) {
      this.setState({ signingIn: true })
      const code = window.location.search.replace('?code=', '')
      this.githubAuthMutation({ variables: { code } })
    }
  }

  requestCode() {
    var clientID = 'GITHUB_CLIENT_ID'
    window.location = `https://github.com/login/oauth/authorize?client_id=${clientID}&scope=user`
  }

  render() {
    return (
      <Mutation mutation={GITHUB_AUTH_MUTATION}
        update={this.authorizationComplete}
        refetchQueries={[{ query: ROOT_QUERY }]}>
        {mutation => {
          this.githubAuthMutation = mutation
          return (
            <button
              onClick={this.requestCode}
              disabled={this.state.signingIn}>
              깃허브로 로그인
            </button>
          )
        }}

      </Mutation>
    )
  }
}

export default withRouter(AuthorizedUser)