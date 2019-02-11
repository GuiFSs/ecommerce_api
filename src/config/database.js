const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const mongoUrl = require('./dbUrl').mongoUrl;

module.exports = mongoose.connect(mongoUrl, { userNewUrlParser: true });

mongoose.Error.messages.general.required = "O atributo '{PATH}' é obrigatorio ";
