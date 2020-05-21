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
import showLesson from './pages/showLesson';
import moduleShow from './pages/moduleShow';
import newModule from './pages/newModule';
import quizres from './pages/quizres';
import showAssign from './pages/showAssign';

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
          <Route exact path="/module/quizes/:ref/result" component={quizres} />
          <Route exact path="/lessons/:lessonId" component={showLesson} />
          <Route exact path="/assignments/:assgnId" component={showAssign} />
          <Route exact path="/module/new/:chapId" component={newModule} />
          <Route exact path="/module/:type/:chapId/:ref" component={moduleShow} />
          <Redirect to="/login"/>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
