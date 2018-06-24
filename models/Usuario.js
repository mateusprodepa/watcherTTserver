const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const ObjectId = mongoose.Schema.Types.ObjectId;

const Usuario = new Schema({
  id: String,
  email: String,
  nome: String,
  setor: String,
  password: String,
  dataDeEntrada: Date,
  matricula: String,
  sistemas: {type: Array, default: []},
});

module.exports = mongoose.model('usuario', Usuario);
