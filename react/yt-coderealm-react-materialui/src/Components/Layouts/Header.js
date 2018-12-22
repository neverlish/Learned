import React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { Dialog } from '../Exercises/'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  flex: {
    flex: 1
  }
}

const Header = ({ classes }) => (
  <AppBar position='static'>
    <Toolbar>
      <Typography
        variant='h5'
        color='inherit'
        className={classes.flex}
      >
        Exercise Database
      </Typography>

      <Dialog />
    </Toolbar>
  </AppBar>
)

export default withStyles(styles)(Header)
