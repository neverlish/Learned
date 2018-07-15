import React, { Component } from 'react'
import { TextField, Select, Button } from 'material-ui'
import { FormControl } from 'material-ui/Form'
import { InputLabel } from 'material-ui/Input'
import { MenuItem } from 'material-ui/Menu'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  FormControl: {
    width: 300
  }
})

export default withStyles(styles)(class extends Component {
  state = this.getInitState()

  getInitState() {
    const { exercise } = this.props

    return exercise ? exercise : {
      title: '',
      description: '',
      muscles: ''
    }
  }

  handleChange = name => ({ target: { value }}) =>
    this.setState({
      [name]: value
    })

  handleSubmit = () => {
    const { exercise } = this.state

    this.props.onSubmit({
      ...exercise,
      id: exercise.title.toLocaleLowerCase().replace(/ /g, '-')
    })

    this.setState({
      title: '',
      description: '',
      muscles: ''
    })
  }

  render() {
    const { title, description, muscles } = this.state,
          { classes, muscles: categories } = this.props

    return <form>
      <TextField
        label='Title'
        value={title}
        onChange={this.handleChange('title')}
        margin='normal'
        className={classes.FormControl}
      />
      <br />
      <FormControl className={classes.FormControl}>
        <InputLabel htmlFor='muscles'>
          Muscles
        </InputLabel>
        <Select
          value={muscles}
          onChange={this.handleChange('muscles')}
        >
          {categories.map(category => 
            <MenuItem value={category} key={category}>
              {category}
            </MenuItem>
          )}>
        </Select>
      </FormControl>
      <br />
      <TextField
        multiline
        rows='4'
        label='Description'
        value={description}
        onChange={this.handleChange('description')}
        margin='normal'
        className={classes.FormControl}
      />
      <br />
      <Button
        color='primary'
        variant='raised'
        onClick={this.handleSubmit}
      >
        Create
      </Button>
    </form>
  }
})
