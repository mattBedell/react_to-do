const tasks = require('express').Router();

const showMethod = (req, res) => res.json(`${req.method} tasks/${req.params.taskId}`);

tasks.route('/:taskId')
  .get(showMethod)
  .put(showMethod)
  .delete(showMethod);

tasks.route('/')
  .get(showMethod)
  .post(showMethod);

module.exports = tasks;
