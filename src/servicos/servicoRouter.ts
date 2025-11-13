// /src/servicos/servicoRouter.ts

import { Router } from "express";
// 1. IMPORTA O SEGURANÇA
import { authenticateToken } from "../middlewares/authMiddleware";
import { ServicoController } from "./servicoController";

const servicoRouter = Router();

/**
 * @swagger
 * tags:
 * name: Serviços
 * description: Gerenciamento de serviços
 */

/**
 * @swagger
 * /servicos:
 * post:
 * summary: (PROTEGIDO) Cria um novo serviço
 * tags: [Serviços]
 * security:                 // <-- ADICIONADO
 * - bearerAuth: []
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * $ref: '#/components/schemas/ServicoInput'
 * responses:
 * 201:
 * description: Serviço criado com sucesso
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Servico'
 * 400:
 * description: Dados inválidos
 * 401:
 * description: Não autorizado (token não fornecido ou inválido) // <-- ADICIONADO
 * 500:
 * description: Erro interno do servidor
 */
// 2. APLICA O SEGURANÇA NA ROTA
servicoRouter.post("/", authenticateToken, ServicoController.create);

/**
 * @swagger
 * /servicos:
 * get:
 * summary: (PÚBLICO) Lista todos os serviços
 * tags: [Serviços]
 * responses:
 * 200:
 * description: Lista de serviços retornada com sucesso
 * 500:
 * description: Erro interno do servidor
 */
// <-- ROTA PÚBLICA, SEM O SEGURANÇA
servicoRouter.get("/", ServicoController.findAll);

/**
 * @swagger
 * /servicos/{id}:
 * get:
 * summary: (PÚBLICO) Busca um serviço pelo ID
 * tags: [Serviços]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: integer
 * description: ID do serviço
 * responses:
 * 200:
 * description: Serviço encontrado
 * 404:
 * description: Serviço não encontrado
 * 400:
 * description: Requisição inválida
 * 500:
 * description: Erro interno do servidor
 */
// <-- ROTA PÚBLICA, SEM O SEGURANÇA
servicoRouter.get("/:id", ServicoController.findById);

/**
 * @swagger
 * /servicos/{id}:
 * put:
 * summary: (PROTEGIDO) Atualiza um serviço existente
 * tags: [Serviços]
 * security:                 // <-- ADICIONADO
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: integer
 * description: ID do serviço
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/ServicoInput'
 * responses:
 * 200:
 * description: Serviço atualizado com sucesso
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Servico'
 * 400:
 * description: Dados inválidos
 * 401:
 * description: Não autorizado (token não fornecido ou inválido) // <-- ADICIONADO
 * 404:
 * description: Serviço não encontrado
 * 500:
 * description: Erro interno do servidor
 */
// 2. APLICA O SEGURANÇA NA ROTA
servicoRouter.put("/:id", authenticateToken, ServicoController.update);

/**
 * @swagger
 * /servicos/{id}:
 * delete:
 * summary: (PROTEGIDO) Remove um serviço
 * tags: [Serviços]
 * security:                 // <-- ADICIONADO
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: integer
 * description: ID do serviço
 * responses:
 * 204:
 * description: Serviço removido com sucesso
 * 401:
 * description: Não autorizado (token não fornecido ou inválido) // <-- ADICIONADO
 * 404:
 * description: Serviço não encontrado
 * 500:
 * description: Erro interno do servidor
 */
// 2. APLICA O SEGURANÇA NA ROTA
servicoRouter.delete("/:id", authenticateToken, ServicoController.delete);
/**
 * @swagger
 * components:
 * schemas:
 * ServicoInput:
 * type: object
 * properties:
 * nome:
 * type: string
 * example: "Corte Masculino"
 * descricao:
 * type: string
 * example: "Corte de cabelo padrão"
 * preco:
 * type: number
 * example: 50
 * duracao:
 * type: integer
 * example: 30
 * Servico:
 * allOf:
 * - $ref: '#/components/schemas/ServicoInput'
 * - type: object
 * properties:
 * id:
 * type: integer
 * example: 1
 * createdAt:
 * type: string
 * format: date-time
 * example: "2025-10-05T12:00:00.000Z"
 * updatedAt:
 * type: string
 * format: date-time
 * example: "2025-10-05T12:10:00.000Z"
 */

export default servicoRouter; 