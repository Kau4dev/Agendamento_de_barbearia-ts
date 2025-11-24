// /src/barbeiros/barbeiroRouter.ts

import express from "express";
// 1. IMPORTA O SEGURANÇA
import { authenticateToken } from "../middlewares/authMiddleware";
import {
  createBarbeiro,
  deleteBarbeiro,
  getAllBarbeiros,
  getBarbeiro,
  updateBarbeiro,
} from "./barbeiroController";
import { avaliacaoController } from "../avaliacoes/avaliacaoController";

/**
 * @swagger
 * tags:
 * name: Barbeiros
 * description: Gerenciamento de barbeiros
 */

export const barbeiroRouter = express.Router();

/**
 * @swagger
 * /barbeiros:
 * post:
 * summary: (PROTEGIDO) Cria um novo barbeiro
 * tags: [Barbeiros]
 * security:                 // <-- ADICIONADO
 * - bearerAuth: []
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/BarbeiroInput'
 * example:
 * nome: "kleber"
 * telefone: "11999999999"
 * responses:
 * 201:
 * description: Barbeiro criado com sucesso
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Barbeiro'
 * 400:
 * description: Dados inválidos
 * 401:
 * description: Não autorizado (token não fornecido ou inválido) // <-- ADICIONADO
 * 500:
 * description: Erro interno do servidor
 */
// 2. APLICA O SEGURANÇA NA ROTA
barbeiroRouter.post("/", authenticateToken, createBarbeiro);
/**
 * @swagger
 * /barbeiros/{id}:
 * delete:
 * summary: (PROTEGIDO) Remove um barbeiro
 * tags: [Barbeiros]
 * security:                 // <-- ADICIONADO
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: integer
 * description: ID do barbeiro
 * responses:
 * 204:
 * description: Barbeiro removido com sucesso
 * 401:
 * description: Não autorizado (token não fornecido ou inválido) // <-- ADICIONADO
 * 404:
 * description: Barbeiro não encontrado
 * 500:
 * description: Erro interno do servidor
 */
// 2. APLICA O SEGURANÇA NA ROTA
barbeiroRouter.delete("/:id", authenticateToken, deleteBarbeiro);
/**
 * @swagger
 * /barbeiros:
 * get:
 * summary: (PÚBLICO) Lista todos os barbeiros
 * tags: [Barbeiros]
 * responses:
 * 200:
 * description: Lista de barbeiros retornada com sucesso
 * 500:
 * description: Erro interno do servidor
 */
// <-- ROTA PÚBLICA, SEM O SEGURANÇA
barbeiroRouter.get("/", getAllBarbeiros);
/**
 * @swagger
 * /barbeiros/{id}:
 * get:
 * summary: (PÚBLICO) Busca um barbeiro pelo ID
 * tags: [Barbeiros]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: integer
 * description: ID do barbeiro
 * responses:
 * 200:
 * description: Barbeiro encontrado
 * 404:
 * description: Barbeiro não encontrado
 * 400:
 * description: Requisição inválida
 * 500:
 * description: Erro interno do servidor
 */
// <-- ROTA PÚBLICA, SEM O SEGURANÇA
barbeiroRouter.get("/:id", getBarbeiro);
/**
 * @swagger
 * /barbeiros/{id}:
 * put:
 * summary: (PROTEGIDO) Atualiza um barbeiro existente
 * tags: [Barbeiros]
 * security:                 // <-- ADICIONADO
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: integer
 * description: ID do barbeiro
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * nome:
 * type: string
 * telefone:
 * type: string
 * responses:
 * 200:
 * description: Barbeiro atualizado com sucesso
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Barbeiro'
 * 400:
 * description: Dados inválidos
 * 401:
 * description: Não autorizado (token não fornecido ou inválido) // <-- ADICIONADO
 * 404:
 * description: Barbeiro não encontrado
 * 500:
 * description: Erro interno do servidor
 */
// 2. APLICA O SEGURANÇA NA ROTA
barbeiroRouter.put("/:id", authenticateToken, updateBarbeiro);

// Rotas de avaliação
barbeiroRouter.post(
  "/:barbeiroId/avaliacoes",
  authenticateToken,
  avaliacaoController.criar
);
barbeiroRouter.get(
  "/:barbeiroId/avaliacoes",
  avaliacaoController.listarPorBarbeiro
);

/**
 * @swagger
 * components:
 * schemas:
 * BarbeiroInput:
 * type: object
 * properties:
 * nome:
 * type: string
 * example: "kleber"
 * telefone:
 * type: string
 * example: "11999999999"
 * Barbeiro:
 * allOf:
 * - $ref: '#/components/schemas/BarbeiroInput'
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
 * }
 */
