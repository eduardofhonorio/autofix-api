const express = require('express');
const router = express.Router();
const agendamentoController = require('../controllers/agendamentoController');
const verifyToken = require('../middlewares/verifyToken');
const { validarAgendamento } = require('../middlewares/validators');

router.post('/', verifyToken, validarAgendamento, agendamentoController.criarAgendamento);
router.get('/', verifyToken, agendamentoController.listarAgendamentos);

module.exports = router;