const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const usuarios = require('./rotas/usuarios');

const port = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/usuarios', usuarios);

app.listen(port, () => console.info(`🌎 => Servidor rodando na porta ${port}`))
