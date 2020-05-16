import * as ActionTypes from '../types';

const initialState = {
  lessons: [],
  lesson: {},
  loading: false
};

export default function(state = initialState, action) {
  switch(action.type) {
    case ActionTypes.GET_LESSONS:
      return {
        ...state,
        lessons: action.payload,
        loading: false,
      }
    case ActionTypes.LESSONS_LOADING:
      return{
        ...state,
        loading: true
      }
    default :
      return state;
  }
}