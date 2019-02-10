const restful = require('node-restful')
const mongoose = restful.mongoose

const user = new mongoose.Schema({
    nome: {type: String, required: true},
    email: {type: String, required: true},
    data: {type: Date, required: true},
    cnpj: {type: String, required: true},
    endereco: {type: Object, required: true}
})

module.exports = restful.model('User', user)