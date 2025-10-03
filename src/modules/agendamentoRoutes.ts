// src/modules/agendamentos/agendamento.routes.ts
import { Router } from 'express';
import { AgendamentoController } from './agendamentoController.js';

const agendamentoRoutes = Router();
const controller = new AgendamentoController();

// Rotas para Agendamentos
agendamentoRoutes.post('/', controller.create);
agendamentoRoutes.get('/', controller.listAll);
agendamentoRoutes.get('/:id', controller.getById);
agendamentoRoutes.put('/:id', controller.update);
agendamentoRoutes.delete('/:id', controller.delete);

export default agendamentoRoutes;