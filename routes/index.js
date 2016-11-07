const home = require('express').Router();

home.get('/', (req, res) => res.json('HOME!'));

module.exports = home;
