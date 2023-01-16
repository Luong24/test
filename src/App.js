import React from 'react'
import { createBrowserHistory } from 'history';
import { Route, Router, Switch } from 'react-router';
import HomeTemplate from './Template/HomeTemplate/HomeTemplate';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Schedule from './pages/Schedule/Schedule';



export const history = createBrowserHistory();
export default function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path='/login' exact component={Login} />
        <HomeTemplate path='/home' exact Component={Home} />
        <HomeTemplate path='/schedule' exact Component={Schedule} />
      </Switch>
    </Router>
  )
}
