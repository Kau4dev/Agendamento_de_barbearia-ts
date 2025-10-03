// Caminho: src/modules/servicos/servicoRoutes.ts

import { Router } from 'express';
import { ServicoController } from './servicoController.js'; // <-- AJUSTADO

const router = Router();

// Rota para CRIAR um serviço
// POST http://localhost:3000/servicos
router.post('/', ServicoController.create);

// Rota para LISTAR TODOS os serviços
// GET http://localhost:3000/servicos
router.get('/', ServicoController.findAll);

// Rota para BUSCAR UM serviço pelo ID
// GET http://localhost:3000/servicos/1
router.get('/:id', ServicoController.findById);

// Rota para ATUALIZAR um serviço pelo ID
// PUT http://localhost:3000/servicos/1
router.put('/:id', ServicoController.update);

// Rota para DELETAR um serviço pelo ID
// DELETE http://localhost:3000/servicos/1
router.delete('/:id', ServicoController.delete);


export default router;