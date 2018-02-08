import React from 'react'
import {
  Route,
} from 'react-router-dom'

export default function (props) {

  const {
    component,
    computedMatch,
    location,
    path,
    exact,
    ...parentProps
  } = props

  const children = (props) => {
    const {
      match,
      location,
      history
    } = props

    return React.createElement(component, {
      match,
      location,
      history,
      ...parentProps
    })
  }

  const routeProps = {
    children,
    computedMatch,
    location,
    path,
  }

  return (
    <Route {...routeProps} />
  )
}