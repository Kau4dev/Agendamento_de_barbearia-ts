// /src/usuarios/usuarioRouter.ts

import express from "express";
// 1. IMPORTA O SEGURANÇA
import { authenticateToken } from "../middlewares/authMiddleware";
import {
  getAllUsuarios,
  getUsuario,
  createUsuario,
  updateUsuario,
  deleteUsuario,
} from "./usuarioController";

export const usuarioRouter = express.Router();

/**
 * @swagger
 * tags:
 * name: Usuários
 * description: Gerenciamento de usuários
 */

/**
 * @swagger
 * /usuarios:
 * get:
 * summary: (PROTEGIDO) Lista todos os usuários
 * tags: [Usuários]
 * security:                 // <-- ADICIONADO
 * - bearerAuth: []
 * responses:
 * 200:
 * description: Lista de usuários retornada com sucesso
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * $ref: '#/components/schemas/Usuario'
 * 401:
 * description: Não autorizado (token não fornecido ou inválido) // <-- ADICIONADO
 * 500:
 * description: Erro interno do servidor
 */
// 2. APLICA O SEGURANÇA NA ROTA
usuarioRouter.get("/", authenticateToken, getAllUsuarios);

/**
 * @swagger
 * /usuarios/{id}:
 * get:
 * summary: (PROTEGIDO) Busca um usuário pelo ID
 * tags: [Usuários]
 * security:                 // <-- ADICIONADO
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: integer
 * description: ID do usuário
 * responses:
 * 200:
 * description: Usuário encontrado
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Usuario'
 * 401:
 * description: Não autorizado (token não fornecido ou inválido) // <-- ADICIONADO
 * 404:
 * description: Usuário não encontrado
 * 500:
 * description: Erro interno do servidor
 */
// 2. APLICA O SEGURANÇA NA ROTA
usuarioRouter.get("/:id", authenticateToken, getUsuario);

/**
 * @swagger
 * /usuarios:
 * post:
 * summary: (PÚBLICO) Cria um novo usuário
 * tags: [Usuários]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/UsuarioInput'
 * responses:
 * 201:
 * description: Usuário criado com sucesso
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Usuario'
 * 400:
 * description: Dados inválidos
 * 500:
 * description: Erro interno do servidor
 */
// 3. ROTA PÚBLICA! (Criar conta) - SEM O SEGURANÇA
usuarioRouter.post("/", createUsuario);

/**
 * @swagger
 * /usuarios/{id}:
 * put:
 * summary: (PROTEGIDO) Atualiza um usuário existente
 * tags: [Usuários]
 * security:                 // <-- ADICIONADO
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: integer
 * description: ID do usuário
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/UsuarioUpdateInput'
 * responses:
 * 200:
 * description: Usuário atualizado com sucesso
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Usuario'
 * 400:
 * description: Dados inválidos
 * 401:
 * description: Não autorizado (token não fornecido ou inválido) // <-- ADICIONADO
 * 404:
 * description: Usuário não encontrado
 * 500:
 * description: Erro interno do servidor
 */
// 2. APLICA O SEGURANÇA NA ROTA
usuarioRouter.put("/:id", authenticateToken, updateUsuario);

/**
 * @swagger
 * /usuarios/{id}:
 * delete:
 * summary: (PROTEGIDO) Remove um usuário
 * tags: [Usuários]
 * security:                 // <-- ADICIONADO
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: integer
 * description: ID do usuário
 * responses:
 * 204:
 * description: Usuário removido com sucesso
 * 401:
 * description: Não autorizado (token não fornecido ou inválido) // <-- ADICIONADO
 * 404:
 * description: Usuário não encontrado
 * 500:
 * description: Erro interno do servidor
 */
// 2. APLICA O SEGURANÇA NA ROTA
usuarioRouter.delete("/:id", authenticateToken, deleteUsuario);

/**
 * @swagger
 * components:
 * schemas:
 * UsuarioInput:
 * type: object
 * properties:
 * nome:
 * type: string
 * example: "João da Silva"
 * email:
 * type: string
 * example: "joao@email.com"
 * senha:
 * type: string
 * example: "Senha@123"
 * telefone:
 * type: string
 * example: "11999999999"
 * UsuarioUpdateInput:
 * type: object
 * properties:
 * nome:
 * type: string
 * example: "João paulo da Silva"
 * senha:
 * type: string
 * example: "Senha@123"
 * telefone:
 * type: string
 * example: "11999999999"
 * Usuario:
 * allOf:
 * - $ref: '#/components/schemas/UsuarioInput'
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