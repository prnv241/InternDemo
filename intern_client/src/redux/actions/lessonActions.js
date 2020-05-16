import * as ActionTypes from '../types';
import axios from 'axios';

export const getLessonsInfo = () => (dispatch) => {
  dispatch({ type: ActionTypes.LESSONS_LOADING });
  axios.get('/lessons')
    .then((res) => {
      dispatch({
        type: ActionTypes.GET_LESSONS,
        payload: res.data
      })
    })
    .catch((err) => {
      console.log(err);
    })
}