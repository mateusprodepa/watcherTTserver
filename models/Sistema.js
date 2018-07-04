const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Sistema = new Schema({
  nome: String,
  status: { type: String, default: 'Online' }
});

module.exports = mongoose.model('sistema', Sistema);
