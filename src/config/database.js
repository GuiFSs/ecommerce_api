const mongoose = require('mongoose')
mongoose.Promise = global.Promise

module.exports = mongoose.connect('mongodb://produto:test123@ds225038.mlab.com:25038/ecommerce', {userNewUrlParser: true})

mongoose.Error.messages.general.required = "O atributo '{PATH}' é obrigatorio "
