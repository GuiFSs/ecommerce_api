const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const ProdutoSchema = new Schema({
  nome: {
    type: String,
    required: true
  },
  preco: {
    type: Number,
    required: true
  },
  descricao: {
    type: String,
    required: true
  },
  caracteristicas: {
    type: Object,
    required: true
  },
  imagens: {
    type: [String],
    required: true
  },
  categoria: {
    type: Schema.Types.ObjectId,
    required: true
  },
  avaliacao: {
    type: Number,
    required: true
  },
  qtdEstoque: {
    type: Number,
    required: true
  }
});

module.exports = Produto = mongoose.model('produtos', ProdutoSchema);
