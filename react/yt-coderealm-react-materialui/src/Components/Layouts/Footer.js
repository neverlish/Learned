import React, { Component } from 'react'
import { compose } from 'recompose'
import { AppBar, Tabs, Tab, withWidth } from '@material-ui/core'
import { withContext } from '../../context'

class Footer extends Component {
  muscles = this.getMuscles()

  getMuscles () {
    return ['', ...this.props.muscles]
  }

  onIndexSelect = (e, index) => {
    this.props.onCategorySelect(this.muscles[index])
  }

  getIndex = () => {
    return this.muscles.indexOf(this.props.category)
  }

  render () {
    const { width } = this.props
    return (
      <AppBar position='static'>
        <Tabs
          value={this.getIndex()}
          onChange={this.onIndexSelect}
          indicatorColor='secondary'
          textColor='secondary'
          centered={width !== 'xs'}
          scrollable={width === 'xs'}
        >
          <Tab label='All' />
          {this.muscles.map(group =>
            <Tab key={group} label={group || 'All'} />
          )}
        </Tabs>
      </AppBar>
    )
  }
}

export default compose(
  withContext,
  withWidth()
)(Footer)
