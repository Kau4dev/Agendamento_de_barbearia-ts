// src/server.ts
import express from 'express';
import 'dotenv/config'; // Carrega as variáveis de ambiente do .env
import cors from 'cors'; // Permite requisições de outros domínios (frontend)
import { errorHandler } from './middlewares/errorHandler.js';
import agendamentoRoutes from './modules/agendamentoRoutes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Habilita o parsing de JSON no corpo das requisições

// Rotas
app.get('/', (req, res) => {
  res.send('API da Barbearia no ar!');
});
app.use('/agendamentos', agendamentoRoutes); // Centraliza as rotas de agendamento

// Middleware de Erro (deve ser o último)
app.use(errorHandler);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});