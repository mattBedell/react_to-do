const tasks = require('express').Router();
const db =    require('../models/task');

const showMethod = (req, res) => res.json(`${req.method} tasks/${req.params.taskId}`);
const sendJSONresp = (req, res) => res.json(res.rows);

tasks.route('/:taskId')
  .get(showMethod)
  .put(showMethod)
  .delete(showMethod);

tasks.route('/')
  .get(db.getTasks, sendJSONresp)
  .post(showMethod);

module.exports = tasks;
