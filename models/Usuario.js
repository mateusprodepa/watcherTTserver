const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const Usuario = new Schema({
  id: ObjectId,
  email: String,
  nome: String,
  setor: String,
  senha: String,
  dataDeEntrada: Date,
  sistemas: Array,
});

module.exports = mongoose.model('usuario', Usuario);
