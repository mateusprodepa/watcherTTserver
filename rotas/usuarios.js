const express = require("express");
const Usuario = require('../models/Usuario');
const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://knevari:sorry4feedurmatchbro@ds217131.mlab.com:17131/nfpro');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post("/", (req, res) => {
  const request = req.body;
  Usuario.findOne({ nome: request.nome }, (err, user) => {
    if(err) return res.json({ erro: 'Ocorreu um erro' });
    if(user) {
      jwt.sign({
        id: user.id,
        nome: user.nome,
        email: user.email,
      }, 'sHzJk@@', (err, token) => res.json({ token }));
    } else {
      console.log(request);
      res.json({ erro: 'Não foi possível encontrar seu usuário. '});
    }
  });
});

module.exports = router;
