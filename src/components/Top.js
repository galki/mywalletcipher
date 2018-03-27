// @flow

import React from 'react'

import Tabs, { Tab } from 'material-ui/Tabs'

import Encrypt from './Encrypt'
import Decrypt from './Decrypt'


type State = {
  tabIndex: number,
};

export default class Top extends React.Component<{}, State> {
  state = {
    tabIndex: 0,
  }

  onTabClick = (event: Event, tabIndex: number) => {
    this.setState({ tabIndex })
  }

  render() {
    const { tabIndex } = this.state

    return (
      <div>
        <Tabs value={tabIndex} onChange={this.onTabClick}>
          <Tab label="Encrypt" />
          <Tab label="Decrypt" />
        </Tabs>
        {tabIndex === 0 && <Encrypt />}
        {tabIndex === 1 && <Decrypt />}
      </div>
    )
  }
}
