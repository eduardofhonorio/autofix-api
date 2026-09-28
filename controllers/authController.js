const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

exports.cadastrar = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const usuarioExiste = await Usuario.findOne({ where: { email } });
    if (usuarioExiste) {
      return res.status(400).json({ erro: 'E-mail já cadastrado.' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const novoUsuario = await Usuario.create({
      nome,
      email,
      senha: senhaHash
    });

    return res.status(201).json({
      mensagem: 'Usuário cadastrado com sucesso!',
      usuario: { id: novoUsuario.id, nome: novoUsuario.nome, email: novoUsuario.email }
    });
  } catch (erro) {
    return res.status(500).json({ erro: 'Erro ao cadastrar usuário.' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(401).json({ erro: 'Credenciais inválidas.' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ erro: 'Credenciais inválidas.' });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    return res.status(200).json({
      mensagem: 'Login realizado com sucesso!',
      token
    });
  } catch (erro) {
    return res.status(500).json({ erro: 'Erro ao realizar login.' });
  }
};