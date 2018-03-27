// @flow

import React from 'react'

import Form from 'material-ui-form'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Divider from 'material-ui/Divider'

// $FlowFixMe
import Encryption from '@utilities/Encryption' // eslint-disable-line


const dividerStyle = { margin: '20px 0' }

type State = {
  decryptedData: ?Object,
};

export default class Decrypt extends React.Component<{}, State> {
  state = {
    decryptedData: undefined,
  }

  submit = (fields: Object) => {
    const { data, password } = fields
    const decryptedData: Object | boolean = Encryption.decrypt(data, password)
    this.setState({ decryptedData })
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.submit}>
          <TextField
            label="Encrypted data"
            helperText="the encrypted text block"
            data-validators="isRequired"
            multiline
            name="data"
            value=""
          />
          <TextField
            label="Password"
            helperText="the password you encrypted your data with"
            data-validators="isRequired"
            type="password"
            name="password"
            value=""
          />
          <Button variant="raised" type="submit">Decrypt</Button>
        </Form>

        { this.state.decryptedData &&
          <div>
            <Divider style={dividerStyle} />
            <span>{this.state.decryptedData['key[0]']}:</span>
            <span>{this.state.decryptedData['value[0]']}</span>
          </div>
        }
      </div>
    )
  }
}
