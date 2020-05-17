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

export const getLesson = (lessonId) => (dispatch) => {
  dispatch({ type: ActionTypes.LESSON_LOADING });
  axios.get(`/lessons/${lessonId}`)
    .then((res) => {
      dispatch({
        type: ActionTypes.GET_LESSON,
        payload: res.data
      })
    })
    .catch((err) => {
      console.log(err);
    })
}

export const setLoading = () => (dispatch) => {
  dispatch({ type: ActionTypes.LESSONS_LOADING });
}
