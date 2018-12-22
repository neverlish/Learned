import React, { Fragment } from 'react'
import { Typography, List, IconButton, ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { Delete, Edit } from '@material-ui/icons'
import { compose } from 'recompose'

import { withContext } from '../../context'

const styles = {
  title: {
    extTransform: 'capitalize'
  }
}

const Catalogue = ({
  exercisesByMuscles,
  category,
  onSelect,
  onDelete,
  onSelectEdit,
  classes
}) => (
  exercisesByMuscles.map(
    ([group, exercises]) =>
      (!category || category === group) && (
        <Fragment key={group}>
          <Typography
            className={classes.title}
            variant='h5'
            color='secondary'
          >
            {group}
          </Typography>
          <List component='ul'>
            {exercises.map(({ id, title }) =>
              <ListItem
                key={id}
                button
                onClick={() => onSelect(id)}
              >
                <ListItemText primary={title} />
                <ListItemSecondaryAction>
                  <IconButton
                    color='primary'
                    onClick={() => onSelectEdit(id)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color='primary'
                    onClick={() => onDelete(id)}
                  >
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            )}
          </List>
        </Fragment>
      )
  )
)

export default compose(
  withContext,
  withStyles(styles)
)(Catalogue)
