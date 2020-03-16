import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import './index.css';
import Landing from './components/landing/Landing'
import Details from './components/details/Details'

ReactDOM.render((
  <Router>
  <div>
    <Switch>
      <Route exact path="/" component={Landing}></Route>
      <Route exact path="/details" component={Details}></Route>
    </Switch>
  </div>
</Router>
), document.getElementById('root')
);
