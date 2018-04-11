import React from 'react'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from 'material-ui/Dialog'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'

class ConfirmDialog extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]).isRequired,
    onCancel: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    yes: PropTypes.string,
    no: PropTypes.string,
    opened: PropTypes.bool.isRequired
  }

  handleConfirm = () => this.props.onConfirm()

  handleCancel = () => this.props.onCancel()

  render () {
    const { title, yes, no } = this.props

    return (
      <Dialog
        open={this.props.opened}
        onClose={this.handleCancel}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{ title }</DialogTitle>
        <DialogContent>
          { this.props.children }
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel} color='primary'>
            {no || 'Cancelar'}
          </Button>
          <Button onClick={this.handleConfirm} color='primary' autoFocus>
            {yes || 'Confirmar'}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default ConfirmDialog
