import React from 'react'
import {
  Switch
} from 'react-router-dom'

export default function ({ children, ...props }) {
  return (
    <Switch>
      {
        React.Children.map(
          children,
          (child => React.cloneElement(child, props))
        )
      }
    </Switch>
  );
}