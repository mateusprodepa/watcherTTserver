const express = require("express");
const Usuario = require('../models/Usuario');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SECRET_KEY = require('./key');
const db = mongoose.connect('mongodb://localhost:27017/watcher');
const router = express.Router();

router.post("/", (req, res) => {
  const request = req.body;

  Usuario.findOne({ email: request.email }, (err, user) => {
    if(err) return res.json({ erro: 'Ocorreu um erro ao validar sua conta' });
    if(user) {
      if(bcrypt.compareSync(request.password, user.password)) {
        jwt.sign({
          id: user.id,
          nome: user.nome,
          email: user.email,
        }, SECRET_KEY, (err, token) => res.json({ token }));
      } else { res.json({ senhasNaoConferem: 'Você inseriu uma senha incorreta' }) }
    } else {
      res.json({ erro: 'Não foi possível encontrar seu usuário. '});
    }
  });
});

module.exports = router;

// NOTE: Developed by Mateus Souza // 24/06/2018
