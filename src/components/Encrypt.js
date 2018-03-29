// @flow

import React, { Component, Fragment } from 'react'
import _ from 'lodash'
import formDataToObject from 'form-data-to-object'

import Button from 'material-ui/Button'
import Form from 'material-ui-form'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import { withStyles } from 'material-ui/styles'

// $FlowFixMe
import Encryption from '@utilities/Encryption' // eslint-disable-line


const styles = theme => ({
  paper: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
})

type Props = {
  classes: Object,
};

type State = {
  encryptedText: string,
  rows: Array<boolean>,
};

@withStyles(styles)
export default class Encrypt extends Component<Props, State> {
  state = {
    encryptedText: '',
    rows: [true],
  }

  addRow = () => {
    const rows = _.clone(this.state.rows)
    rows.push(true)
    this.setState({ rows })
  }

  submit = (fields: Object) => {
    const { password, pin } = fields
    const data = formDataToObject.toObj(_.omit(fields, ['password', 'pin'])).rows
    const encryptedText: string = Encryption.encrypt(data, password, pin)
    this.setState({ encryptedText })
  }

  render() {
    const { classes } = this.props

    return (
      <div>
        <Form onSubmit={this.submit}>
          <Paper className={classes.paper} elevation={4}>
            {this.state.rows.map((row, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <Fragment key={row + i}>
                <TextField
                  label="Label"
                  helperText="the name of what you're encrypting"
                  data-validators="isRequired"
                  name={`rows[${i}][label]`}
                  value=""
                />
                <TextField
                  label="Value"
                  helperText="the data you're encrypting"
                  data-validators="isRequired"
                  name={`rows[${i}][value]`}
                  value=""
                />
              </Fragment>
            ))}
            <Button variant="raised" onClick={this.addRow}>Add row</Button>
          </Paper>

          <Paper className={classes.paper} elevation={4}>
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
            <Button variant="raised" type="submit">Encrypt</Button>
          </Paper>
        </Form>

        <Paper className={classes.paper} elevation={4}>
          {this.state.encryptedText}
        </Paper>
      </div>
    )
  }
}
