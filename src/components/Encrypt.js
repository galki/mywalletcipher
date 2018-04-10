// @flow

import React, { Component, Fragment } from 'react'
import _ from 'lodash'
import formDataToObject from 'form-data-to-object'
import ClipboardJS from 'clipboard'

import Button from 'material-ui/Button'
import Divider from 'material-ui/Divider'
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
import IconButton from 'material-ui/IconButton'
import RemoveIcon from 'mdi-material-ui/CloseCircle'

import Encryption from '_utilities/Encryption'


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    marginRight: '20px',
    width: '235px',
  },
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
})

type Props = {
  classes: Object,
};

type State = {
  encryptedText: string,
  rows: Array<Object>,
};

class Encrypt extends Component<Props, State> {
  state = {
    encryptedText: '',
    rows: [{ wallet: '', secret: '' }],
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

  closeDialog = () => {
    this.setState({ encryptedText: '' })
  }

  addRow = () => {
    const { rows } = this.state
    rows.push({ wallet: '', secret: '' })
    this.setState({ rows })
  }

  removeRow = (index) => {
    const { rows } = this.state
    if (rows.length > 1) {
      rows.splice(index, 1)
      this.setState({ rows })
    }
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
              <Fragment key={_.uniqueId()}>
                <TextField
                  label="Wallet"
                  helperText="wallet name or address"
                  data-validators="isRequired"
                  name={`rows[${i}][wallet]`}
                  value=""
                  className={classes.input}
                />
                <TextField
                  label="Secret"
                  helperText="password, PK, mnemonic phrase"
                  data-validators="isRequired"
                  name={`rows[${i}][secret]`}
                  value=""
                />
                {this.state.rows.length > 1 &&
                  <IconButton
                    className={classes.button}
                    aria-label="Remove wallet"
                    onClick={() => this.removeRow(i)}
                    deletefieldrow={`rows[${i}]`}
                  >
                    <RemoveIcon />
                  </IconButton>
                }
              </Fragment>
            ))}
            <br /><br />
            <Button variant="raised" onClick={this.addRow}>Add row</Button>

            <Divider style={{ margin: '20px 0' }} />

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
            <Button variant="raised" color="primary" type="submit">Encrypt</Button>
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
