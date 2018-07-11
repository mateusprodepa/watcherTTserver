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
  sistemas: { type: Array,
    default: [
      {
        nome: "sisp2",
        imgUrl: "http://www.egpa.pa.gov.br/sites/default/files/bannergoverno_digital.jpg",
        status: "Online"
      }
    ]},
});

module.exports = mongoose.model('usuario', Usuario);
