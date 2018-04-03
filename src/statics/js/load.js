/* eslint-disable */

requirejs.config({
  paths: {
    lodash: [
      '//unpkg.com/lodash@4.17.5/lodash.min',
    ],
    react: [
      '//unpkg.com/react@16.3.0/umd/react.production.min',
    ],
    'react-dom': [
      '//unpkg.com/react-dom@16.3.0/umd/react-dom.production.min',
    ],
    'react-router-dom': [
      '//unpkg.com/react-router-dom@4.2.2/umd/react-router-dom.min',
    ],
    'node-forge': [
      '//unpkg.com/node-forge@0.7.0/dist/forge.min',
    ],
  },
})

define([
  'lodash',
  'react',
  'react-dom',
  'react-router-dom',
  'node-forge',
], () => {
  require(['./main'])
})
