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


export const getModule = (type,chapId,ref) => (dispatch) => {
  dispatch({ type: ActionTypes.MODULE_LOADING });
  axios.get(`/module/${type}/${chapId}/${ref}`)
    .then((res) => {
      dispatch({
        type: ActionTypes.GET_MODULE,
        payload: res.data
      })
    })
    .catch((err) => {
      console.log(err);
    })
}

export const uploadFile = (formData) => (dispatch) => {
  dispatch({ type: ActionTypes.UPLOADING_FILE });
  axios.post(`/module/upload`, formData )
    .then((res) => {
      dispatch({ type: ActionTypes.SET_URL, payload: res.data.fileUrl });
    })
    .catch(err => {
      console.log(err);
    });
}

export const addModule = (vidData, chapId) => (dispatch) => {
  dispatch({ type: ActionTypes.UPLOADING_FILE });
  axios.post(`/module/new/${chapId}`, vidData)
    .then(res => {
      console.log(res);
      dispatch({ type: ActionTypes.FILE_UPLOADED });
    })
    .catch(err => {
      console.log(err);
    })
}

export const submitQuiz = (chapId, ref, quizAns) => (dispatch) =>{
  dispatch({ type: ActionTypes.RESULTS_LOADING });
  axios.post(`/module/quizes/${chapId}/${ref}`, {quizAns: quizAns})
    .then(res => {
      dispatch({
        type: ActionTypes.LOADED_RESULTS
      })
    })
    .catch(err => {
      console.log(err);
    })
}

export const getResult = (ref) => (dispatch) => {
  axios.get(`/module/quizes/${ref}/result`)
    .then(res => {
      dispatch({
        type: ActionTypes.SET_RESULTS,
        payload: res.data
      })
    })
    .catch(err => {
      console.log(err);
    })
}

export const markRead = (type,chapId,ref) => (dispatch) => {
  axios.post(`/module/${type}/${chapId}/${ref}`)
    .then(() => {
      dispatch(getModule(type,chapId,ref));
    })
    .catch(err => {
      console.log(err);
    })
}

export const setDefault = () => (dispatch) => {
  dispatch({ type: ActionTypes.SET_DEFAULT });
}