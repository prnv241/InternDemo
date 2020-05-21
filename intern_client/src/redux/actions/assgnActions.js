import * as ActionTypes from '../types';
import axios from 'axios';

export const getAssgnInfo = () => (dispatch) => {
  dispatch({ type: ActionTypes.ASSIGNMENTS_LOADING });
  axios.get('/assignments')
    .then((res) => {
      dispatch({
        type: ActionTypes.GET_ASSIGNMENTS,
        payload: res.data
      })
    })
    .catch((err) => {
      console.log(err);
    })
}

export const getAssgn = (assgnId) => (dispatch) => {
  dispatch({ type: ActionTypes.ASSGN_LOADING });
  axios.get(`/assignments/${assgnId}`)
    .then(res => {
      dispatch({
        type: ActionTypes.GET_ASSGN,
        payload: res.data
      })
    })
    .catch(err => {
      console.log(err);
    })
}