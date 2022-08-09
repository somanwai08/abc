import React, { Suspense } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  // Link,
} from 'react-router-dom'
// import { History } from './utils/history'
import TabBarLayout from './pages/Layouts/TabBarLayout'

import './App.scss'
import ProfileEdit from './pages/Profile/Edit'
const Login = React.lazy(() => import('@/pages/Login'))

// const Home = React.lazy(() => import('@/pages/Home'))

export default function App() {
  return (
    <Router>
      <div className="app">
        {/* <Link to="/login">Login</Link>
        <Link to="/home">Home</Link> */}
        <Suspense fallback={<div>loading...</div>}>
          <Switch>
            <Redirect exact from="/" to="/home"></Redirect>
            <Route path="/home" component={TabBarLayout}></Route>
            <Route path="/profile/edit" component={ProfileEdit}></Route>
            <Route path="/login" component={Login}></Route>
          </Switch>
        </Suspense>
      </div>
    </Router>
  )
}
