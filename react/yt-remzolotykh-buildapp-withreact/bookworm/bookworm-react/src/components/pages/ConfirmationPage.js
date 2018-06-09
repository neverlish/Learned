import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Icon, Message } from 'semantic-ui-react'
import { confirm } from '../../actions/auth'

class ConfirmationPage extends React.Component {
  state = {
    loading: true,
    success: false
  }

  componentDidMount() {
    this.props.confirm(this.props.match.params.token)
      .then(() => this.setState({ loading: false, success: true }))
      .catch((() => this.setState({ loading: false, success: false })))
  }

  render() {
    const { loading, success } = this.state
    return (
      <div>
        {loading && <Message icon>
          <Icon name='circle notched' loading />
          <Message.Header>Validating your email</Message.Header>
        </Message>}

        {!loading && success && <Message icon>
          <Icon name='checkmark' />
          <Message.Header>Thank you. Your account has been verified.</Message.Header>
          <Link to='/dashboard'>Go to your dashboard</Link>
        </Message>}

        {!loading && !success && <Message icon>
          <Icon name='warning sign' />
          <Message.Header>Ooops. Invalid token seems.</Message.Header>
        </Message>}
      </div>
    )
  }
}

ConfirmationPage.propTypes = {
  confirm: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
}

export default connect(null, { confirm })(ConfirmationPage)
