import React from 'react'
import { createBrowserHistory } from 'history';
import { Route, Router, Switch } from 'react-router';
import HomeTemplate from './Template/HomeTemplate/HomeTemplate';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Schedule from './pages/Schedule/Schedule';
import CreateSchedule from './pages/Schedule/CreateSchedule';
import { _create, _home, _login, _schedule } from './utils/config/configPath';



export const history = createBrowserHistory();
export default function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path={`${_login}`} exact component={Login} />
        <HomeTemplate path={`${_home}`} exact Component={Home} />
        <HomeTemplate path={`${_schedule}`} exact Component={Schedule} />
        <HomeTemplate path={`${_schedule}${_create}`} exact Component={CreateSchedule} />

      </Switch>
    </Router>
  )
}
