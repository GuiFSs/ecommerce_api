const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const AnuncioSchema = new Schema({
  descricao: {
    type: String,
    required: true
  },
  imagem: {
    type: String,
    required: true
  }
});

module.exports = Anuncio = mongoose.model('anuncios', AnuncioSchema);
