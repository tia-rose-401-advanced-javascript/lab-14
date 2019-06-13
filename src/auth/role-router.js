'use strict';

const express = require('express');
const newRouter = express.Router();

const User = require('./users-model');
const auth = require('./middleware');

newRouter.get('/public-stuff', (req, res, next) => {
  res.status(200).send('In the public stuff route');
})

newRouter.get('/hidden-stuff'), auth, (req,res) => {
  res.status(200).send('In the public stuff route');
}

module.exports = newRouter;