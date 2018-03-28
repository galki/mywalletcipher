// @flow

import React from 'react'
import _ from 'lodash'

import Form from 'material-ui-form'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Divider from 'material-ui/Divider'

// $FlowFixMe
import Encryption from '@utilities/Encryption' // eslint-disable-line


const dividerStyle = { margin: '20px 0' }

type State = {
  encryptedText: string
};

export default class Encrypt extends React.Component<{}, State> {
  state = {
    encryptedText: '',
  }

  submit = (fields: Object) => {
    const { password, pin } = fields
    const data = _.omit(fields, ['password', 'pin'])
    const encryptedText: string = Encryption.encrypt(data, password, pin)
    this.setState({ encryptedText })
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.submit}>
          <TextField
            label="Label"
            helperText="the name of what you're encrypting"
            data-validators="isRequired"
            name="key[0]"
            value=""
          />
          <TextField
            label="Value"
            helperText="the data you're encrypting"
            data-validators="isRequired"
            name="value[0]"
            value=""
          />

          <Divider style={dividerStyle} />

          <TextField
            label="Password"
            helperText="the password you encrypted your data with"
            data-validators="isRequired"
            type="password"
            name="password"
            value=""
          />
          <TextField
            label="PIN code"
            helperText="4 digit PIN code for extra security"
            data-validators={['isInt', { isLength: { min: 4, max: 4 } }]}
            name="pin"
            value=""
          />

          <Divider style={dividerStyle} />

          <Button variant="raised" type="submit">Encrypt</Button>
        </Form>

        <Divider style={dividerStyle} />

        <span>
          {this.state.encryptedText}
        </span>
      </div>
    )
  }
}
