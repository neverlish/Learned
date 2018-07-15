import React, { Component, Fragment } from 'react'
import { Dialog, Button } from 'material-ui'
import {
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog'
import { Add } from 'material-ui-icons'

import Form from './Form'

export default class extends Component {
  state = {
    open: false
  }

  handleToggle = () => {
    this.setState({
      open: !this.state.open
    })
  }

  render() {
    const { open } = this.state,
          { muscles, onCreate } = this.props

    return <Fragment>
      <Button variant='fab' onClick={this.handleToggle} mini>
        <Add />
      </Button>
      <Dialog
        open={open}
        onClose={this.handleToggle}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>
          Create a New Exercise
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out the form below.
          </DialogContentText>

          <Form
            muscles={muscles}
            onSubmit={onCreate}
          />
        </DialogContent>
      </Dialog>
    </Fragment>
  }
}
