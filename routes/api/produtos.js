const express = require('express'),
  router = express.Router();

const Produto = require('../../models/Produto');
const Categoria = require('../../models/Categoria');

const validarProdutoInput = require('../../validation/produto');

/**
 * @route GET api/produtos/todos
 * @description Get todos produtos
 * @acesso Publico
 */
router.get('/todos', async (req, res) => {
  try {
    const produtos = await Produto.find().exec();
    if (produtos.length <= 0) {
      return res.status(404).json({ produtos: 'Nenhum produto encontrado' });
    }
    res.status(200).json(produtos);
  } catch (err) {
    res.status(400).json(err);
  }
});

/**
 * @route GET api/produtos/:categoria
 * @description Get todos produtos por categoria
 * @acesso Publico
 */
router.get('/todos/:categoria', async (req, res) => {
  const errors = {};
  try {
    const categoria = await Categoria.findOne({ nome: req.params.categoria });
    if (!categoria) {
      errors.categoria = 'Essa ainda categoria não existe';
      return res.status(404).json(errors);
    }
    const produtos = await Produto.find({ categoria: categoria._id }).exec();
    if (produtos.length <= 0) {
      errors.produtos = 'Ainda não existem produtos pare esta categoria';
      return res.status(404).json(errors);
    }
    res.status(200).json(produtos);
  } catch (err) {
    res.status(400).json(err);
  }
});

/**
 * @route GET api/produtos/:id
 * @description Get produto por id
 * @acesso Publico
 */
router.get('/:id', async (req, res) => {
  try {
    const produto = await Produto.findById({ _id: req.params.id }).exec();
    if (!produto) {
      res.status(404).json({ produto: 'Produto não encontrado' });
    }
    res.status(200).json(produto);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
