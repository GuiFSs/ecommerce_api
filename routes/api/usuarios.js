const express = require('express'),
  router = express.Router(),
  jwt = require('jsonwebtoken'),
  bcrypt = require('bcryptjs'),
  keys = require('../../config/keys'),
  passport = require('passport');

const validarRegistroInput = require('../../validation/cadastro');
const validarLoginInput = require('../../validation/login');

const Usuario = require('../../models/Usuario');

/**
 * @route POST api/usuario
 * @description Cadastrar novo usuario
 * @acesso Publico
 */
router.post('/', async (req, res) => {
  const { errors, isValid } = validarRegistroInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const usuario = await Usuario.findOne({ email: req.body.email }).exec();
    if (usuario) {
      errors.email = 'Esse email já existe';
      return res.status(400).json(errors);
    }
    const newUsuario = new Usuario({ ...req.body });

    try {
      const salt = await bcrypt.genSalt(10);
      newUsuario.senha = await bcrypt.hash(newUsuario.senha, salt);
      await newUsuario.save();
      const showUser = { ...newUsuario._doc };
      delete showUser.__v;
      delete showUser.senha;
      console.log(showUser);

      res.status(201).json(showUser);
    } catch (err) {
      res.status(400).json({ err });
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

/**
 * @route GET api/usuario
 * @description Login user using email and password
 * @acesso Publico
 */
router.get('/', async (req, res) => {
  const { errors, isValid } = validarLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { email, senha } = req.body;
  try {
    const usuario = await Usuario.findOne({ email }).exec();
    if (!usuario) {
      errors.email = 'Email ou senha incorretos';
      errors.senha = 'Email ou senha incorretos';
      return res.status(404).json(errors);
    }
    // Check password
    const isMatch = await bcrypt.compare(senha, usuario.senha);
    if (!isMatch) {
      errors.email = 'Email ou senha incorretos';
      errors.senha = 'Email ou senha incorretos';
      return res.status(400).json(errors);
    }
    const payload = { id: usuario._id, email: usuario.email };
    jwt.sign(payload, keys.secrectOrKey, { expiresIn: 3600 }, (err, token) => {
      res.json({ success: true, token: 'Bearer ' + token });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

/**
 * @route GET api/usuario/atual
 * @description Get current user
 * @acesso Private
 */
router.get(
  '/atual',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const usuario = await Usuario.findById(req.user.id).exec();
      delete usuario._doc.senha;
      res.status(200).json(usuario);
    } catch (err) {
      res.status(404).json({ err });
    }
  }
);
module.exports = router;
