const functions = require('firebase-functions');
const { getLessonsInfo, getLesson, getModule, newModule, uploadModule, checkResults, markRead, getResult } = require('./handlers/lessons');

const express = require('express');
const app = express();

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

//Lessons 

app.get('/lessons', getLessonsInfo);

app.post('/module/upload', uploadModule);

app.get('/module/quizes/:ref/result', getResult)

app.post('/module/quizes/:chapId/:ref', checkResults);

app.post('/module/new/:chapId', newModule);

app.get('/lessons/:lessonId', getLesson);

app.get('/module/:type/:chapId/:ref', getModule);

app.post('/module/:type/:chapId/:ref', markRead);

exports.api = functions.https.onRequest(app);