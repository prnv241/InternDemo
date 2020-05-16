import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import lessonReducer from "./reducers/lessonReducer";
import assignmentReducer from './reducers/assignmentReducer';
import liveReducer from './reducers/liveReducer';

const initalstate = {};

const middleware = [thunk];

const reducers = combineReducers({
  lessons: lessonReducer,
  assignments: assignmentReducer,
  liveStreams: liveReducer
});

const store = createStore(
  reducers,
  initalstate,
  compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

export default store;