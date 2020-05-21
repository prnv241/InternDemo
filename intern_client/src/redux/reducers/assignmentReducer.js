import * as ActionTypes from '../types';

const initialState = {
  assignments: [],
  assignment: {},
  loading: {
    aloading: true,
    ploading: true
  }
};

export default function(state = initialState, action) {
  switch(action.type) {
    case ActionTypes.GET_ASSIGNMENTS:
      return {
        ...state,
        assignments: action.payload,
        loading: {
          ...state.loading,
          aloading: false 
        }
      }
    case ActionTypes.GET_ASSGN:
      return {
        ...state,
        assignment: action.payload,
        loading: {
          ...state.loading,
          ploading: false 
        }
      }
    case ActionTypes.ASSIGNMENTS_LOADING:
      return {
        ...state,
        loading: {
          ...state.loading,
          aloading: true 
        }
      }
    case ActionTypes.ASSGN_LOADING:
      return {
        ...state,
        loading: {
          ...state.loading,
          ploading: true 
        }
      }
    default :
      return state;
  }
}