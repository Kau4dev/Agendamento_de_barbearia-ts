// src/agenda/agendaRoutes.ts

import { Router } from 'express';
import { agendaController } from './agendaController.js';
import { validate } from '../middlewares/validate.js'; // Middleware de validação
import { updateAgendaSchema } from './agendaSchema.js'; // Schema do Zod

const router = Router();

// Rota para buscar a agenda de um barbeiro específico
router.get(
    '/agenda/:barbeiroId', 
    agendaController.get
);

// Rota para criar ou atualizar a agenda de um barbeiro
router.put(
    '/agenda/:barbeiroId',
    validate(updateAgendaSchema), // Valida o body da requisição antes de continuar
    agendaController.update
);

export default router;