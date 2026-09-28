const express = require('express');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const agendamentoRoutes = require('./routes/agendamentoRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/agendamentos', agendamentoRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync({ force: false }).then(() => {
  console.log('Banco de dados MySQL conectado e sincronizado via Sequelize!');
  app.listen(PORT, () => {
    console.log(`Servidor AutoFix rodando na porta ${PORT}`);
  });
}).catch((erro) => {
  console.error('Erro ao conectar ao banco de dados:', erro);
});
