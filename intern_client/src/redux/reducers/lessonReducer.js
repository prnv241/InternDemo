import * as ActionTypes from '../types';

const initialState = {
  lessons: [],
  lesson: {},
  sloading: true,
  loading: true,
};

export default function(state = initialState, action) {
  switch(action.type) {
    case ActionTypes.GET_LESSONS:
      return {
        ...state,
        lessons: action.payload,
        sloading: false,
      }
    case ActionTypes.LESSONS_LOADING:
      return{
        ...state,
        sloading: true
      }
    case ActionTypes.LESSON_LOADING:
      return{
        ...state,
        loading: true
      }
    case ActionTypes.GET_LESSON:
      return {
        ...state,
        lesson: action.payload,
        loading: false
      }
    default :
      return state;
  }
}