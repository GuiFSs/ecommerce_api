const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  senha: {
    type: String,
    required: true
  },
  endereco: {
    type: Object
  },
  meusPedidos: {
    type: Array,
    default: []
  },
  telefone: {
    type: Array,
    default: []
  }
});

module.exports = Usuario = mongoose.model('usuarios', UsuarioSchema);
