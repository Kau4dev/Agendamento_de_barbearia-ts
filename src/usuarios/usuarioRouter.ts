import express from "express";
import {
  getAllUsuarios,
  getUsuario,
  createUsuario,
  updateUsuario,
  deleteUsuario,
} from "./usuarioController";
import { authMiddleware } from "../middlewares/authMiddleware";

export const usuarioRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Gerenciamento de usuários
 */

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *       500:
 *         description: Erro interno do servidor
 */
usuarioRouter.get("/", authMiddleware, getAllUsuarios);

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Busca um usuário pelo ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuário não encontrado
 *       400:
 *         description: Requisição inválida
 *       500:
 *         description: Erro interno do servidor
 */
usuarioRouter.get("/:id", authMiddleware, getUsuario);

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioInput'
 *             example:
 *               nome: "João da Silva"
 *               email: "joao@email.com"
 *               senha: "Senha@123"
 *               telefone: "11999999999"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *               example:
 *                 id: 1
 *                 nome: "João da Silva"
 *                 email: "joao@email.com"
 *                 telefone: "11999999999"
 *                 senha: "Senha@123"
 *                 createdAt: "2025-10-05T12:00:00.000Z"
 *                 updatedAt: "2025-10-05T12:00:00.000Z"
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */
usuarioRouter.post("/", createUsuario);

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Atualiza um usuário existente
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioUpdateInput'
 *             example:
 *               nome: "João paulo da Silva"
 *               senha: "Senha@123"
 *               telefone: "11999999999"
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *               example:
 *                 id: 1
 *                 nome: "João da Silva"
 *                 email: "joao@email.com"
 *                 telefone: "11999999999"
 *                 senha: "Senha@123"
 *                 createdAt: "2025-10-05T12:00:00.000Z"
 *                 updatedAt: "2025-10-05T12:00:00.000Z"
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
usuarioRouter.put("/:id", authMiddleware, updateUsuario);

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Remove um usuário
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       204:
 *         description: Usuário removido com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
usuarioRouter.delete("/:id", authMiddleware, deleteUsuario);

/**
 * @swagger
 * components:
 *   schemas:
 *     UsuarioInput:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *           example: "João da Silva"
 *         email:
 *           type: string
 *           example: "joao@email.com"
 *         senha:
 *           type: string
 *           example: "Senha@123"
 *         telefone:
 *           type: string
 *           example: "11999999999"
 *     UsuarioUpdateInput:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *           example: "João paulo da Silva"
 *         senha:
 *           type: string
 *           example: "Senha@123"
 *         telefone:
 *           type: string
 *           example: "11999999999"
 *     Usuario:
 *       allOf:
 *         - $ref: '#/components/schemas/UsuarioInput'
 *         - type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 1
 *             createdAt:
 *               type: string
 *               format: date-time
 *               example: "2025-10-05T12:00:00.000Z"
 *             updatedAt:
 *               type: string
 *               format: date-time
 *               example: "2025-10-05T12:10:00.000Z"
 */
