const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const express = require('express');
const SECRET_KEY = require('./key');
const Usuario = require('../models/Usuario');
const Sistema = require('../models/Sistema');

const db = mongoose.connect('mongodb://localhost:27017/watcher');
const router = express.Router();

// Ajeitar aqui

router.get('/', verifyToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, user) => {
    if(err) return res.sendStatus(403);
    const { id, nome, email } = user;
    Usuario.findOne({ email }, (err, us) => {
      if(err) return res.sendStatus(403);

      us.sistemas.forEach(sistema => {
        Sistema.find({ nome: sistema.nome }, (err, sys) => {
          if(err) return res.sendStatus(403);
          if(!sys) return res.sendStatus(403);

          sys.forEach(s => {
            if(s.nome === sistema.nome) {
              sistema.status = s.status;
            }
          })

          us.save((err, user) => {
            if(err) return res.sendStatus(403);
            res.json(user.sistemas);
          });
        });
      })
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
