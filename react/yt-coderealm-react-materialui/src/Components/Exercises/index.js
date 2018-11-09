import React, { Fragment } from 'react'
import { Grid, Paper, Typography, List, IconButton, ListItem, ListItemText, ListItemSecondaryAction, withStyles } from '@material-ui/core'
import { Delete, Edit } from '@material-ui/icons'
import Form from './Form'
import { withContext } from '../../context'

const styles = theme => ({
  Paper: {
    padding: theme.spacing.unit * 3,
    overflowY: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginTop: 5,
      height: 'calc(100% - 10px)'
    },
    [theme.breakpoints.down('xs')]: {
      height: '100%'
    }
  },
  '@global': {
    'html, body, #root': {
      height: '100%'
    }
  },
  container: {
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px - 48px)'
    },
    [theme.breakpoints.down('xs')]: {
      height: 'calc(100% - 50px - 48px)'
    }
  },
  item: {
    [theme.breakpoints.down('xs')]: {
      height: '50%'
    }
  }
})

const Exercises =
  ({
    classes,
    muscles,
    exercisesByMuscles,
    exercises,
    category,
    editMode,
    onSelect,
    exercise,
    exercise: {
      id,
      title = 'Welcome!',
      description = 'Please select an exercise from the list on the left'
    },
    onDelete,
    onSelectEdit,
    onEdit
  }) =>
    <Grid container className={classes.container}>
      <Grid item className={classes.item} xs={12} sm={6}>
        <Paper className={classes.Paper}>
          {exercisesByMuscles.map(([group, exercises]) =>
            !category || category === group
              ? <Fragment key={group}>
                <Typography
                  variant='headline'
                  color='secondary'
                  style={{ textTransform: 'capitalize' }}
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
                        <IconButton color='primary' onClick={() => onSelectEdit(id)}>
                          <Edit />
                        </IconButton>
                        <IconButton color='primary' onClick={() => onDelete(id)}>
                          <Delete />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  )}
                </List>
              </Fragment>
              : null
          )}
        </Paper>
      </Grid>
      <Grid item className={classes.item} xs={12} sm={6}>
        <Paper className={classes.Paper}>
          <Typography
            variant='display1'
            gutterBottom
            color='secondary'
          >
            {title}
          </Typography>
          {editMode
            ? <Form
              key={id}
              exercise={exercise}
              muscles={muscles}
              onSubmit={onEdit}
            />
            : <Fragment>
              <Typography
                variant='subheading'
              >
                {description}
              </Typography>
            </Fragment>}
        </Paper>
      </Grid>
    </Grid>

export default withContext(withStyles(styles)(Exercises))
