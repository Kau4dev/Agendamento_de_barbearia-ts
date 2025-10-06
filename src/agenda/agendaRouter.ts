// src/agenda/agendaRoutes.ts

import { Router } from 'express';
import { AgendaController } from './agendaController'; // [✔] LINHA CORRIGIDA
import { validate } from '../middlewares/validate';
import { updateAgendaSchema } from './agenda.schema';

const router = Router();

// Rota para buscar a agenda de um barbeiro específico
router.get(
  '/agenda/:barbeiroId',
  AgendaController.get
);

// Rota para criar ou atualizar a agenda de um barbeiro
router.put(
  '/agenda/:barbeiroId',
  validate(updateAgendaSchema),
  AgendaController.update
);

export default router;