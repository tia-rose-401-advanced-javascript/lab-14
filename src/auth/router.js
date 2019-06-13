'use strict';

const express = require('express');
const authRouter = express.Router();
const newRouter = express.Router();

const User = require('./users-model.js');
const auth = require('./middleware.js');
const oauth = require('./oauth/google.js');


authRouter.get('/public-stuff', (req, res, next) => {
  res.status(200).send('In the public stuff route');
})

newRouter.get('/hidden-stuff'), auth, (req,res) => {
  res.status(200).send('In the public stuff route');
}

authRouter.post('/signup', (req, res, next) => {
  let user = new User(req.body);
  user.save()
    .then( (user) => {
      req.token = user.generateToken();
      req.user = user;
      res.set('token', req.token);
      res.cookie('auth', req.token);
      res.send(req.token);
    })
    .catch(next);
});

authRouter.get('/signin', auth(), (req, res, next) => {
  res.cookie('auth', req.token);
  res.send(req.token);
});

authRouter.get('/oauth', (req,res,next) => {
  oauth.authorize(req)
    .then( token => {
      res.status(200).send(token);
    })
    .catch(next);
});

authRouter.post('/key', auth, (req,res,next) => {
  let key = req.user.generateKey();
  res.status(200).send(key);
});

module.exports = authRouter;
