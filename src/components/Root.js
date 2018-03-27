import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Link, Route } from 'react-router-dom'

import CssBaseline from 'material-ui/CssBaseline'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Button from 'material-ui/Button'

import Top from './Top'


const wrapperStyle = {
  backgroundColor: 'white',
  height: 'inherit',
  overflowX: 'hidden',
  overflowY: 'auto',
}

const Root = () => (
  <div style={wrapperStyle}>
    <CssBaseline />
    <BrowserRouter>
      <div style={{ flexGrow: 1 }}>
        <AppBar position="sticky">
          <Toolbar>
            <span>
              satoshi cipher (
              <a
                href="https://github.com/unitedhubs/satoshicipher"
                rel="noopener noreferrer"
                target="_blank"
              >
                Github
              </a>)
            </span>
          </Toolbar>
        </AppBar>

        <Route exact path="/" component={Top} />
      </div>
    </BrowserRouter>
  </div>
)

export default Root
