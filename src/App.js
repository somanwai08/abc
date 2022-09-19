import React, { Suspense } from 'react'
import {
  Router,
  Route,
  Switch,
  Redirect,
  // Link,
} from 'react-router-dom'

import TabBarLayout from './pages/Layouts/TabBarLayout'

import './App.scss'
import ProfileEdit from './pages/Profile/Edit'
import AuthRoute from './components/AuthRoute'
import history from './utils/history'

const Login = React.lazy(() => import('@/pages/Login'))
const Chat = React.lazy(() => import('@/pages/Profile/Chat'))
const NotFound = React.lazy(() => import('@/pages/Notfound'))
const Feedback = React.lazy(() => import('@/pages/Profile/Feedback'))
// const Home = React.lazy(() => import('@/pages/Home'))

export default function App() {
  return (
    // 注意：BrowserHistory 等价于 Router上面加一个history属性
    <Router history={history}>
      <div className="app">
        {/* <Link to="/login">Login</Link>
        <Link to="/home">Home</Link> */}
        <Suspense fallback={<div>loading...</div>}>
          <Switch>
            <Redirect exact from="/" to="/home"></Redirect>
            <Route path="/home" component={TabBarLayout}></Route>
            <AuthRoute path="/profile/edit" component={ProfileEdit}></AuthRoute>
            <AuthRoute
              path="/profile/feedback"
              component={Feedback}
            ></AuthRoute>
            <Route path="/login" component={Login}></Route>
            <AuthRoute path="/profile/chat" component={Chat}></AuthRoute>
            <Route component={NotFound}></Route>
          </Switch>
        </Suspense>
      </div>
    </Router>
  )
}
