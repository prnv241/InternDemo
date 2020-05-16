import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";

import { Provider } from "react-redux";
import store from "./redux/store";

import log from "./pages/login";
import lesson from './pages/lessons';
import assignment from './pages/assignments';
import live from './pages/live';

axios.defaults.baseURL = 'https://us-central1-interndemo-25232.cloudfunctions.net/api';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={log} />
          <Route exact path="/lessons" component={lesson} />
          <Route exact path="/assignments" component={assignment} />
          <Route exact path="/live" component={live} />
          <Redirect to="/login"/>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
