import React from 'react'
import { SnackbarContent } from 'material-ui/Snackbar'

const NotFound = () => {
  return (
    <SnackbarContent
      message='Conteúdo não encontrado'
      style={{ margin: 10 }}
    />
  )
}

export default NotFound
