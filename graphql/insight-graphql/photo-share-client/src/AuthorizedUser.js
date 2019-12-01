import React, { Component } from 'react'
import { withRouter, NavLink } from 'react-router-dom'
import { Query, Mutation, withApollo, compose } from "react-apollo"
import { gql } from 'apollo-boost'
import { ROOT_QUERY } from './App'

const GITHUB_AUTH_MUTATION = gql`
  mutation githubAuth($code: String!) {
    githubAuth(code: $code) { token }
  }
`

const Me = ({ logout, requestCode, signingIn }) =>
  <Query query={ROOT_QUERY}>
    {({ loading, data }) => data.me ? <CurrentUser {...data.me} logout={logout} />
      : loading
        ? <p>loading...</p>
        : <button
          onClick={requestCode}
          disabled={signingIn}>
          깃허브로 로그인
      </button>}
  </Query>

const CurrentUser = ({ name, avatar, logout }) =>
  <div>
    <img src={avatar} width={48} height={48} alt='' />
    <h1>{name}</h1>
    <button onClick={logout}>logout</button>
    <NavLink to='/newPhoto'>Post Photo</NavLink>
  </div>

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

  logout = () => {
    localStorage.removeItem('token')
    let data = this.props.client.readQuery({ query: ROOT_QUERY })
    data.me = null
    this.props.client.writeQuery({ query: ROOT_QUERY, data })
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
            <Me signingIn={this.state.signingIn}
              requestCode={this.requestCode}
              logout={this.logout} />
          )
        }}

      </Mutation>
    )
  }
}

export default compose(withApollo, withRouter)(AuthorizedUser)