const express = require('express');
const bodyParser = require('body-parser');
const login = require('./rotas/usuarios');
const auth = require('./rotas/auth');
const sistemasUsuario = require('./rotas/sistemasUsuario')
const sistemasServidor = require('./rotas/sistemasServidor');

const port = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/login', login);
app.use('/api/auth', auth);
app.use('/api/meusSistemas', sistemasUsuario);
app.use('/api/sistemasServidor', sistemasServidor);

app.get("/smiley", (req, res) => res.json({"Hello World": "✈️"}))

app.listen(port, () => console.info(` 🌎 => Servidor rodando na porta ${port}`))

// NOTE: Developed by Mateus Souza // 24/06/2018
