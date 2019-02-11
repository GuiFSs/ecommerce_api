const produto = require('./produto')

produto.methods(['get', 'post', 'put', 'delete'])
produto.updateOptions({new: true, runValidators: true})

module.exports = produto