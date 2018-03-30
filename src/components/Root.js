// @flow

import React, { Fragment } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import { MuiThemeProvider } from 'material-ui/styles'
import CssBaseline from 'material-ui/CssBaseline'

import theme from '../styles/theme'
import Header from './Header'
import Top from './Top'


export default () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <Fragment>
        <Header />
        <Route exact path="/" component={Top} />
      </Fragment>
    </BrowserRouter>
  </MuiThemeProvider>
)
