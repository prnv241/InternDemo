import * as ActionTypes from '../types';

const initialState = {
  liveStreams: [],
  liveStream: {},
  loading: false
};

export default function(state = initialState, action) {
  switch(action.type) {
    default :
      return state;
  }
}