const functions = require('firebase-functions');
const { db } = require('./util/admin');
const { getLessonsInfo } = require('./handlers/lessons');

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






exports.api = functions.https.onRequest(app);