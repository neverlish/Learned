import React from 'react'
import { AppBar, Tabs, Tab } from '@material-ui/core'
import widthWidth from '@material-ui/core/es/withWidth'

export default widthWidth()(
  ({ muscles, category, onSelect, width }) => {
    const index = category
      ? muscles.findIndex(group => group === category) + 1
      : 0

    const onIndexSelect = (e, index) => 
      onSelect(index === 0 ? '' : muscles[index - 1])

    return <AppBar position='static'>
      <Tabs
        value={index}
        onChange={onIndexSelect}
        indicatorColor='secondary'
        textColor='secondary'
        centered={width !== 'xs'}
        scrollable={width === 'xs'}
      >
        <Tab label='All' />
        {muscles.map(group => 
          <Tab key={group} label={group} />
        )}
      </Tabs>
    </AppBar>
  }
)
