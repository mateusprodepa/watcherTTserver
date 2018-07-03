const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const express = require('express');
const SECRET_KEY = require('./key');
const Usuario = require('../models/Usuario');

const db = mongoose.connect('mongodb://localhost/watcher');
const router = express.Router();

router.get('/', verifyToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, user) => {
    if(err) return res.sendStatus(403);
    const { id, nome, email } = user;
    Usuario.findOne({ email }, (err, user) => {
      if(err) return res.sendStatus(403);
      res.json(user.sistemas);
    });
  });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];

  if(typeof bearerHeader !== 'undefined') {
    req.token = bearerHeader.split(' ')[1];
  } else {
    res.sendStatus(403);
  }

  next();
}

module.exports = router;
