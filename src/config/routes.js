const express = require('express')

module.exports = function(server){
    //API ROUTER
    const router = express.Router()
    server.use('/register', router)

    //User routes
    const produtoService = require('../api/user/userService')
    produtoService.register(router, '/user')
}