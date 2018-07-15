import React from 'react'
import { Paper, Tabs } from 'material-ui'
import { Tab } from 'material-ui/Tabs'

export default ({ muscles }) => 
  <Paper>
    <Tabs
      value={0}
      indicatorColor='primary'
      textColor='primary'
      centered
    >
      <Tab label='All' />
      {muscles.map(group => 
        <Tab label={group} />
      )}
    </Tabs>
  </Paper>

