const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validarCadastro } = require('../middlewares/validators');

router.post('/cadastrar', validarCadastro, authController.cadastrar);
router.post('/login', authController.login);

module.exports = router;