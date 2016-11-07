'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');

const taskRoute = require('./routes/taskRoute');
const homeRoute = require('./routes/index');

const isDev = !('NODE_ENV' in process.env) && require('dotenv').config() && true;


const app = express();

const PORT = process.argv[2] || process.env.PORT || 3000;
app.listen(PORT, () => console.log(`LISTENING ON PORT: ${PORT}`));

app.use(logger(isDev ? 'dev' : 'common'));


app.use(bodyParser.json());

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Something broke!');
});
app.use('/', homeRoute);
app.use('/tasks', taskRoute);
