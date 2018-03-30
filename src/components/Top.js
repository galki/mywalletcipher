// @flow

import React from 'react'

import Grid from 'material-ui/Grid'
import Tabs, { Tab } from 'material-ui/Tabs'
import { withStyles } from 'material-ui/styles'

import Encrypt from './Encrypt'
import Decrypt from './Decrypt'


const styles = {
  root: {
    flexGrow: 1,
    margin: '0 auto',
    width: '600px',
    paddingBottom: '50px',
  },
}

type Props = {
  classes: Object,
};

type State = {
  tabIndex: number,
};

class Top extends React.Component<Props, State> {
  state = {
    tabIndex: 0,
  }

  onTabClick = (event: Event, tabIndex: number) => {
    this.setState({ tabIndex })
  }

  render() {
    const { classes } = this.props
    const { tabIndex } = this.state

    return (
      <Grid container className={classes.root} spacing={16}>
        <Grid item xs={12}>
          <Tabs centered value={tabIndex} onChange={this.onTabClick}>
            <Tab label="Encrypt" />
            <Tab label="Decrypt" />
          </Tabs>
        </Grid>
        <Grid item xs={12}>
          {tabIndex === 0 && <Encrypt />}
          {tabIndex === 1 && <Decrypt />}
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(Top)
