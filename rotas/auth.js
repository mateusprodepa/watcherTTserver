const express = require("express");
const Usuario = require('../models/Usuario');
const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://knevari:sorry4feedurmatchbro@ds217131.mlab.com:17131/nfpro');
const jwt = require('jsonwebtoken');
const shortid = require('shortid');
const bcrypt = require('bcrypt');
const SECRET_KEY = require('./key');
const router = express.Router();

const validarCadastro = (dados, callback, warn) => {
  let encounteredErrors = {};
  let res;
  for(var i in dados) {
    if(dados[i] === "" || null || undefined) {
      encounteredErrors = Object.assign({ camposVazios: "Por favor, não deixe os campos em branco" }, encounteredErrors);
    }
  }

  if(dados.password !== dados.cnfPass) {
    encounteredErrors = Object.assign({ senhasDiferentes: "As senhas devem combinar" }, encounteredErrors);
  }

  if(Object.keys(encounteredErrors).length !== 0) {
    return warn(encounteredErrors);
  } else {
    const hash = bcrypt.hashSync(dados.password, 10);
    res = {
      errors: encounteredErrors,
      email: dados.email,
      nome: dados.login,
      setor: dados.setor,
      password: hash,
      matricula: dados.matricula,
      id: shortid.generate(),
    }
  }

  return callback(res);
}

router.post("/", (req, res) => {
  let { email, login, setor, password, cnfPass, matricula, errors } = req.body;
  const dados = validarCadastro({ email, login, setor, password, cnfPass, matricula, errors }, (dados) => {
    const user = new Usuario(dados);
    user.save((err, usuario) => {
      if(err) {
        res.status(500).send({ error: "Não foi possível criar a sua conta." });
      } else {
        jwt.sign({
          nome: user.nome,
          email: user.email,
          id: user.id
        }, SECRET_KEY, (err, token) => res.json({ token }));
      }
    });
  }, (err) => err ? res.json(err) : "");
});

module.exports = router;
