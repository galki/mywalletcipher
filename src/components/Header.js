// @flow

import React from 'react'

import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import { withStyles } from 'material-ui/styles'
import GithubIcon from 'mdi-material-ui/GithubCircle'


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  flex: {
    flex: 1,
  },
})

type Props = {
  classes: Object,
};

const Header = (props: Props) => {
  const { classes } = props

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="title" color="inherit" className={classes.flex}>
          mywalletcipher
        </Typography>
        <a
          href="https://github.com/unitedhubs/mywalletcipher"
          rel="noopener noreferrer"
          target="_blank"
        >
          <IconButton
            color="secondary"
            className={classes.button}
            aria-label="Github"
          >
            <GithubIcon />
          </IconButton>
        </a>
      </Toolbar>
    </AppBar>
  )
}

export default withStyles(styles)(Header)
