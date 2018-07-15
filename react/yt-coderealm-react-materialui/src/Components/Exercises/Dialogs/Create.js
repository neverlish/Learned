import React, { Component, Fragment } from 'react'
import { Dialog, Button } from 'material-ui'
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog'
import { Add } from 'material-ui-icons'

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
    const { open } = this.state
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

          <form>
          </form>

          <DialogActions>
            <Button color='primary' variant='raised'>
              Create
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Fragment>
  }
}
  