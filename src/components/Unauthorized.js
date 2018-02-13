import React from 'react'
import { SnackbarContent } from 'material-ui/Snackbar'

const Unauthorized = () => {
  return (
    <SnackbarContent
      message='Acesso não autorizado.'
      style={{ margin: 10 }}
    />
  )
}

export default Unauthorized
