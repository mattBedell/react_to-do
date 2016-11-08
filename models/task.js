const pg = require('pg-promise')({});

const config = {
  host:     process.env.DB_HOST,
  port:     process.env.DB_PORT,
  database: 'todo',
  user:     process.env.DB_USER,
  password: process.env.DB_PASS,
};
const db = pg(config);

module.exports = {
  getTasks(req, res, next) {
    db.any('SELECT * FROM task;')
    .then((tasks) => {
      res.rows = tasks;
      next();
    })
    .catch(error => next(error));
  },
  addTask(req, res, next) {
    db.one(`
      INSERT INTO task (name, description)
      VALUES ($/name/, $/desc/)
      RETURNING *;
      `, req.body)
    .then((task) => {
      res.rows = task;
      next();
    })
    .catch((error) => next(error));
  },
  deleteTask(req, res, next) {
    req.body.tId = Number.parseInt(req.params.taskId);
    db.none(`
      DELETE FROM task
      WHERE id = $1
      `, [req.body.tId])
      .then(() => {
        next();
      })
      .catch(error => next(error));
  },
};
