const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://localhost:27017/watcher');
const Sistema = require('../models/Sistema');

router.post('/', (req, res) => {
  const { nome, status } = req.body;

  Sistema.findOne({ nome }, (err, sistema) => {
    if(err) return res.sendStatus(403);
    if(!sistema) return res.sendStatus(403);

    sistema.status = status;
    sistema.save((err, sys) => {
      if(err) return ers.sendStatus(403);
      res.json(sys);
    });
  });
});

router.post('/novoSistema', (req, res) => {
  const { nome, status } = req.body;
  const s = new Sistema({
    nome,
    status
  })

  s.save((err, sys) => {
    if(err) return res.sendStatus(403);
    res.json(sys);
  });
});

module.exports = router;
