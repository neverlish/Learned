import React, { Component, Fragment } from 'react'
import { Dialog, DialogContent, DialogContentText, DialogTitle, Fab } from '@material-ui/core'
import { Add } from '@material-ui/icons'

import Form from './Form'
import { ExercisesContext } from '../../context'

class CreateDialog extends Component {
  static contextType = ExercisesContext

  state = {
    open: false
  }

  handleToggle = () => {
    this.setState({
      open: !this.state.open
    })
  }

  handleFormSubmit = exercise => {
    this.handleToggle()
    this.context.onCreate(exercise)
  }

  render () {
    const { open } = this.state
    const { muscles } = this.context

    return (
      <Fragment>
        <Fab
          onClick={this.handleToggle}
          color='secondary'
          size='small'
        >
          <Add />
        </Fab>
        <Dialog
          open={open}
          onClose={this.handleToggle}
          fullWidth
          maxWidth='sm'
        >
          <DialogTitle >
            Create a New Exercise
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please fill out the form below.
            </DialogContentText>

            <Form
              muscles={muscles}
              onSubmit={this.handleFormSubmit}
            />
          </DialogContent>
        </Dialog>
      </Fragment>
    )
  }
}

export default CreateDialog
