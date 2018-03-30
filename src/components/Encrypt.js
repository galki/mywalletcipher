// @flow

import React, { Component, Fragment } from 'react'
import _ from 'lodash'
import formDataToObject from 'form-data-to-object'
import ClipboardJS from 'clipboard'

import Button from 'material-ui/Button'
import Form from 'material-ui-form'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import { withStyles } from 'material-ui/styles'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog'

// $FlowFixMe
import Encryption from '@utilities/Encryption' // eslint-disable-line


const styles = theme => ({
  paper: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
  textarea: {
    width: '100%',
    minHeight: '200px',
    border: 'none',
    marginTop: '25px',
    resize: 'vertical',
  },
  input: {
    marginRight: '20px',
    width: '300px',
  },
})

type Props = {
  classes: Object,
};

type State = {
  encryptedText: string,
  rows: Array<boolean>,
};

class Encrypt extends Component<Props, State> {
  state = {
    encryptedText: '',
    rows: [true],
  }

  componentDidMount() {
    this.clipboard = new ClipboardJS('.copy')

    this.clipboard.on('success', (e) => {
      console.info('Action:', e.action)
      console.info('Text:', e.text)
      console.info('Trigger:', e.trigger)
    })
  }

  clipboard: ?Object

  addRow = () => {
    const rows = _.clone(this.state.rows)
    rows.push(true)
    this.setState({ rows })
  }

  closeDialog = () => {
    this.setState({ encryptedText: '' })
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
                  helperText="what are you encrypting?"
                  data-validators="isRequired"
                  name={`rows[${i}][label]`}
                  value=""
                  className={classes.input}
                />
                <TextField
                  label="Value"
                  helperText="the data you want to encrypt"
                  data-validators="isRequired"
                  name={`rows[${i}][value]`}
                  value=""
                />
              </Fragment>
            ))}
            <br /><br />
            <Button variant="raised" onClick={this.addRow}>Add row</Button>
          </Paper>

          <Paper className={classes.paper} elevation={4}>
            <TextField
              label="Password"
              helperText="you will need it to decrypt your data"
              data-validators="isRequired"
              type="password"
              name="password"
              value=""
              className={classes.input}
            />
            <TextField
              label="PIN code"
              helperText="4 digit PIN code for extra security"
              data-validators={['isInt', { isLength: { min: 4, max: 4 } }]}
              name="pin"
              value=""
            />
            <br /><br />
            <Button variant="raised" type="submit">Encrypt</Button>
          </Paper>
        </Form>

        <Dialog
          fullScreen={false}
          open={this.state.encryptedText !== ''}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            You encrypted your data
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Copy the encrypted text below and keep it in a safe place.
              When you need to decrypt it, use the Decrypt tab
            </DialogContentText>
            <input
              id="copyInput"
              type="hidden"
              className="copy"
              data-clipboard-text={this.state.encryptedText}
            />
            <textarea
              className={classes.textarea}
              data-clipboard-target="#copyInput"
              defaultValue={this.state.encryptedText}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeDialog} color="primary">
              Done
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default withStyles(styles)(Encrypt)
