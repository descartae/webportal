import React from 'react'
import { CircularProgress } from 'material-ui/Progress'

const Loading = () => {
  return (
    <div style={{ textAlign: 'center' }}><CircularProgress size={50} /></div>
  )
}

export default Loading
