const { body, validationResult } = require('express-validator');

const validarCadastro = [
  body('nome').notEmpty().withMessage('O nome é obrigatório.').trim(),
  body('email').isEmail().withMessage('Informe um e-mail válido.').normalizeEmail(),
  body('senha').isLength({ min: 6 }).withMessage('A senha deve ter no mínimo 6 caracteres.'),
  (req, res, next) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({ erros: erros.array() });
    }
    next();
  }
];

const validarAgendamento = [
  body('veiculo').notEmpty().withMessage('O veículo é obrigatório.'),
  body('placa').notEmpty().withMessage('A placa do veículo é obrigatória.'),
  body('servico').notEmpty().withMessage('O tipo de serviço é obrigatório.'),
  body('data_hora').isISO8601().withMessage('Informe uma data e hora válidas (formato ISO).'),
  (req, res, next) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({ erros: erros.array() });
    }
    next();
  }
];

module.exports = { validarCadastro, validarAgendamento };