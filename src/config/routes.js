const express = require('express');

module.exports = function(server) {
  //API ROUTER
  const router = express.Router();
  server.use('/api', router);

  //User routes
  const userService = require('../api/user/userService');
  userService.register(router, '/user');

  //Produto routes
  const produtoService = require('../api/produto/produtoService');
  produtoService.register(router, '/product');
};
