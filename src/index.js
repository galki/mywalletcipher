import React from 'react'
import ReactDOM from 'react-dom'

// import './styles.less'
import Root from './components/Root'


const store = {}
ReactDOM.render(
  <Root store={store} />,
  document.querySelector('#root')
)
