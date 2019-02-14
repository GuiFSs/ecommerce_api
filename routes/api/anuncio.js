const express = require('express');
const router = express.Router();

const Anuncio = require('../../models/Anuncio');
let keys_anuncio = {};

if (process.env.NODE_ENV === 'production') {
  keys_anuncio.user = process.env.USER;
  keys_anuncio.password = process.env.PASSWORD;
} else {
  keys_anuncio = require('../../config/keys_anuncio');
}

/**
 * @route GET api/anuncio
 * @description Get anuncios
 * @acesso Publico
 */
router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 0;
    const anuncios = await Anuncio.find()
      .limit(limit)
      .exec();
    if (anuncios.length === 0) {
      return res.status(404).json({ anuncios: 'Nenhum anuncio encontrado' });
    }
    return res.status(200).json({ anuncios });
  } catch (err) {
    res.status(400).json({ err });
  }
});

/**
 * @route GET api/anuncio:id
 * @description Get anuncio by id
 * @acesso Publico
 */
router.get('/:id', async (req, res) => {
  try {
    const anuncio = await Anuncio.findById(req.params.id).exec();
    if (anuncio.length === 0) {
      return res.status(404).json({ anuncio: 'Nenhum anuncio encontrado' });
    }
    return res.status(200).json({ anuncios: anuncio });
  } catch (err) {
    res.status(400).json({ err });
  }
});

/**
 * @route POST api/anuncio
 * @description Create new anuncio
 * @acesso Private
 */
router.post('', async (req, res) => {
  try {
    const { descricao, imagem, user, password } = req.body;
    if (user !== keys_anuncio.user || password !== keys_anuncio.password) {
      return res.status(400).json({
        mensagem: 'user ou password incorretos, você não pode criar anuncios'
      });
    }
    const anuncio = new Anuncio({ descricao, imagem });
    await anuncio.save();
    res.status(201).json({ anuncio, mensagem: 'Anuncio criado com sucesso' });
  } catch (err) {
    res
      .status(400)
      .json({ err, mensagem: 'Não foi possivel criar um novo anuncio' });
  }
});

/**
 * @route DELETE api/anuncio
 * @description Delete an anuncio
 * @acesso PRIVATE
 */
router.delete('', async (req, res) => {
  try {
    const { id, user, password } = req.body;
    if (user !== keys_anuncio.user || password !== keys_anuncio.password) {
      console.log({ user, password });
      return res.status(400).json({
        user,
        password,
        mensagem: 'user ou password incorretos, você não pode deletar anuncios'
      });
    }
    const response = await Anuncio.findById(id).remove.exec();
    res
      .status(200)
      .json({ response, mensagem: 'Anuncio deletado com sucesso' });
  } catch (err) {
    res
      .status(400)
      .json({ err, mensagem: 'Não foi possivel deletar o anuncio' });
  }
});

module.exports = router;
