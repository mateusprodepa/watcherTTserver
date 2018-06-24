const express = require("express");
const Usuario = require('../models/Usuario');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const shortid = require('shortid');
const bcrypt = require('bcrypt');
const SECRET_KEY = require('./key');
const db = mongoose.connect('mongodb://localhost/nfpro');
const router = express.Router();

// Função para validar os parâmetros passados pelo usuário através do formulário de cadastro
const validarCadastro = (dados = {}, callback, warn) => {
  let encounteredErrors = {}, res;
  for(var i in dados) {
    if(dados[i] === "" || null || undefined) encounteredErrors = Object.assign({ camposVazios: "Por favor, não deixe os campos em branco" }, encounteredErrors);
  }

  if(dados.password !== dados.cnfPass) encounteredErrors = Object.assign({ senhasDiferentes: "As senhas devem combinar" }, encounteredErrors);

  if(Object.keys(encounteredErrors).length !== 0) {
    return warn(encounteredErrors);
  } else {
    res = {
      errors: encounteredErrors,
      email: dados.email,
      nome: dados.login,
      setor: dados.setor,
      password: bcrypt.hashSync(dados.password, 10),
      matricula: dados.matricula,
      id: shortid.generate(),
    }
  }

  return callback(res);
}

// WARNING: Rota para cadastrar novo usuário caso os parâmetros estejam corretos
// WARNING: Funcionalidade baseada em uma única função que recebe os parâmetros
// WARNING: Da requisição HTTP, valida, e retorna um callback dependendo do resultado

router.post("/", (req, res) => {
  let { email, login, setor, password, cnfPass, matricula, errors } = req.body;
  const dados = validarCadastro({
    email,
    login,
    setor,
    password,
    cnfPass,
    matricula,
    errors
  }, userData => {

    Usuario.findOne({ email }, (err, resultado) => {
      if (resultado) return res.json(Object.assign({ nomeEmUso: "Este email já está em uso" }, errors));
      
      const user = new Usuario(userData);
      user.save((err, usuario) => {

        if(err) return res.status(500).send({ error: "Não foi possível criar a sua conta." })

        jwt.sign({ nome: user.nome, email: user.email, id: user.id },
          SECRET_KEY, (err, token) =>
          res.json({ token }));

      });
    });
  },
  err => err ? res.json(err) : "");
});

module.exports = router;


// NOTE: Developed by Mateus Souza // 24/06/2018
