'use strict';

const express = require('express');
const bodyParser = require('body-parser')
const logger = require('morgan');

const isDev = !('NODE_ENV' in process.env) && require('dotenv').config() && true;


const app = express();

const PORT = process.argv[2] || process.env.PORT || 3000;

app.use(logger(isDev ? 'dev' : 'common'));


app.use(bodyParser.json());

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Something broke!');
})
app.get('/')





app.listen(PORT, () => console.log(`LISTENING ON PORT: ${PORT}`));
