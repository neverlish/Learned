import React, { Component } from 'react'
import { TextField, Select, Button, FormControl, InputLabel, MenuItem } from '@material-ui/core'

class Form extends Component {
  state = this.getInitState()

  getInitState () {
    const { exercise } = this.props

    return exercise || {
      title: '',
      description: '',
      muscles: ''
    }
  }

  handleChange = ({ target: { name, value } }) =>
    this.setState({
      [name]: value
    })

  handleSubmit = () => {
    this.props.onSubmit({
      id: this.state.title.toLowerCase().replace(/ /g, '-'),
      ...this.state
    })
  }

  render () {
    const { title, description, muscles } = this.state

    const { exercise, muscles: categories } = this.props

    return <form>
      <TextField
        label='Title'
        value={title}
        name='title'
        onChange={this.handleChange}
        margin='normal'
        fullWidth
      />
      <FormControl fullWidth margin='normal'>
        <InputLabel htmlFor='muscles'>
          Muscles
        </InputLabel>
        <Select
          value={muscles}
          name='muscles'
          onChange={this.handleChange}
        >
          {categories.map(category =>
            <MenuItem value={category} key={category}>
              {category}
            </MenuItem>
          )}>
        </Select>
      </FormControl>
      <TextField
        multiline
        rows='4'
        label='Description'
        value={description}
        name='description'
        onChange={this.handleChange}
        margin='normal'
        fullWidth
      />
      <Button
        color='primary'
        variant='contained'
        onClick={this.handleSubmit}
      >
        {exercise ? 'Edit' : 'Create'}
      </Button>
    </form>
  }
}

export default Form
