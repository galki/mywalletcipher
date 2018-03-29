// @flow

import React from 'react'
import Form from 'material-ui-form'

import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from 'material-ui/Table'
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
  table: {
    minWidth: 700,
  },
})

type Props = {
  classes: Object,
};

type State = {
  rows: ?Object,
};

@withStyles(styles)
export default class Decrypt extends React.Component<Props, State> {
  state = {
    rows: undefined,
  }

  submit = (fields: Object) => {
    const { encryptedData, password, pin } = fields
    const rows: ?Object = Encryption.decrypt(encryptedData, password, pin)
    this.setState({ rows })
  }

  render() {
    const { classes } = this.props

    return (
      <div>
        <Form onSubmit={this.submit}>
          <Paper className={classes.paper} elevation={4}>
            <TextField
              label="Encrypted data"
              helperText="the encrypted text block"
              data-validators="isRequired"
              multiline
              rowsMax="5"
              name="encryptedData"
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
            <TextField
              label="PIN code"
              helperText="4 digit PIN code for extra security"
              data-validators={['isInt', { isLength: { min: 4, max: 4 } }]}
              name="pin"
              value=""
            />
          </Paper>
          <Paper className={classes.paper} elevation={4}>
            <Button variant="raised" type="submit">Decrypt</Button>
          </Paper>
        </Form>

        { this.state.rows &&
          <Paper className={classes.paper} elevation={4}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Label</TableCell>
                  <TableCell>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.rows.map(row => (
                  <TableRow key={row.label}>
                    <TableCell>{row.label}</TableCell>
                    <TableCell>{row.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        }
      </div>
    )
  }
}
