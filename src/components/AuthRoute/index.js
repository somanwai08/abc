import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { hasToken } from '../../utils/storage'

export default function AuthRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        // 有Token，就显示传入的组件
        if (hasToken()) {
          return <Component></Component>
        }
        return (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          ></Redirect>
        )
      }}
    ></Route>
  )
}
