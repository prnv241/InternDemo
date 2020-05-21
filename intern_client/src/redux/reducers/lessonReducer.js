import * as ActionTypes from '../types';

const initialState = {
  lessons: [],
  lesson: {},
  module: {},
  result: {},
  sloading: true,
  mloading: true,
  loading: true,
  ploading: true,
  rloading: null,
  upload: null,
  url: null,
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
    case ActionTypes.MODULE_LOADING:
      return{
        ...state,
        mloading: true
      }
    case ActionTypes.GET_LESSON:
      return {
        ...state,
        lesson: action.payload,
        loading: false
      }
    case ActionTypes.GET_MODULE:
      return {
        ...state,
        module: action.payload,
        mloading: false
      }
    case ActionTypes.UPLOADING_FILE:
      return {
        ...state,
        upload: true,
      }
    case ActionTypes.FILE_UPLOADED:
      return {
        ...state,
        upload: false,
      }
    case ActionTypes.SET_URL:
      return {
        ...state,
        upload: null,
        url: action.payload
      }
    case ActionTypes.SET_DEFAULT:
      return {
        ...state,
        ploading: true,
        upload: null,
        url: null,
      }
    case ActionTypes.SET_RESULTS:
      return {
        ...state,
        result: action.payload,
        ploading: false,
      }
    case ActionTypes.RESULTS_LOADING:
      return {
        ...state,
        rloading: true
      }
    case ActionTypes.LOADED_RESULTS: 
      return {
        ...state,
        rloading: false
      }
    default :
      return state;
  }
}