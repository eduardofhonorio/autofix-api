const Agendamento = require('../models/Agendamento');
const Usuario = require('../models/Usuario');

exports.criarAgendamento = async (req, res) => {
  try {
    const { veiculo, placa, servico, data_hora } = req.body;
    const usuarioId = req.usuario.id; 

    const novoAgendamento = await Agendamento.create({
      veiculo,
      placa,
      servico,
      data_hora,
      usuarioId
    });

    return res.status(201).json({
      mensagem: 'Agendamento de serviço realizado com sucesso!',
      agendamento: novoAgendamento
    });
  } catch (erro) {
    return res.status(500).json({ erro: 'Erro ao criar agendamento.' });
  }
};

exports.listarAgendamentos = async (req, res) => {
  try {
    const agendamentos = await Agendamento.findAll({
      where: { usuarioId: req.usuario.id },
      include: [{ model: Usuario, attributes: ['id', 'nome', 'email'] }]
    });

    return res.status(200).json(agendamentos);
  } catch (erro) {
    return res.status(500).json({ erro: 'Erro ao buscar agendamentos.' });
  }
};