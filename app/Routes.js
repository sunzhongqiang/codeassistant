import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import routes from './constants/routes';
import HomePage from './containers/HomePage';

export default () => (
  <div>
    <HashRouter>
      <Switch>
        <Route path={routes.HOME} component={HomePage} />
        <Route path={routes.HOME} component={HomePage} />
      </Switch>
    </HashRouter>
  </div>
);
