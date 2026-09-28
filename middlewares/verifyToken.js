const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ erro: 'Acesso negado. Token não fornecido.' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ erro: 'Formato do token inválido.' });
  }

  try {
    const usuarioDecodificado = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = usuarioDecodificado;
    next(); 
  } catch (erro) {
    return res.status(403).json({ erro: 'Token inválido ou expirado.' });
  }
}

module.exports = verifyToken;