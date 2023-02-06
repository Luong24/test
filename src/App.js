import React from 'react'
import { createBrowserHistory } from 'history';
import { Route, Router, Switch } from 'react-router';
import HomeTemplate from './Template/HomeTemplate/HomeTemplate';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Schedule from './pages/Schedule/Schedule';
import CreateSchedule from './pages/Schedule/CreateSchedule';
import { _create, _home, _login, _new, _schedule, _update, _view } from './utils/config/configPath';
import UpdateSchedule from './pages/Schedule/UpdateSchedule';
import DetailSchedule from './pages/Schedule/DetailSchedule';
import ManageNew from './pages/News/ManageNew';
import DetailNew from './pages/News/DetailNew';
import CreateNew from './pages/News/CreateNew';
import UpdateNew from './pages/News/UpdateNew';



export const history = createBrowserHistory();
export default function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path={`${_login}`} exact component={Login} />
        <HomeTemplate path={`${_home}`} exact Component={Home} />


        <HomeTemplate path={`${_schedule}`} exact Component={Schedule} />
        <HomeTemplate path={`${_schedule}${_create}`} exact Component={CreateSchedule} />
        <HomeTemplate path={`${_schedule}${_update}/:code`} exact Component={UpdateSchedule} />
        <HomeTemplate path={`${_schedule}${_view}/:code`} exact Component={DetailSchedule} />


        <HomeTemplate path={`${_new}`} exact Component={ManageNew} />
        <HomeTemplate path={`${_new}${_view}/:code`} exact Component={DetailNew} />
        <HomeTemplate path={`${_new}${_create}`} exact Component={CreateNew} />
        <HomeTemplate path={`${_new}${_update}/:code`} exact Component={UpdateNew} />




      </Switch>
    </Router>
  )
}
