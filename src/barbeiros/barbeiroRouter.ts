import express from "express";
import {
  createBarbeiro,
  deleteBarbeiro,
  getAllBarbeiros,
  getBarbeiro,
  updateBarbeiro,
} from "./barbeiroController";
import { authMiddleware } from "../middlewares/authMiddleware";

/**
 * @swagger
 * tags:
 *   name: Barbeiros
 *   description: Gerenciamento de barbeiros
 */

export const barbeiroRouter = express.Router();

barbeiroRouter.use(authMiddleware);

/**
 * @swagger
 * /barbeiros:
 *   post:
 *     summary: Cria um novo barbeiro
 *     tags: [Barbeiros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BarbeiroInput'
 *           example:
 *             nome: "kleber"
 *             telefone: "11999999999"
 *     responses:
 *       201:
 *         description: Barbeiro criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Barbeiro'
 *             example:
 *               id: 1
 *               nome: "kleber"
 *               telefone: "11999999999"
 *               createdAt: "2025-10-05T12:00:00.000Z"
 *               updatedAt: "2025-10-05T12:00:00.000Z"
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */
barbeiroRouter.post("/", createBarbeiro);
/**
 * @swagger
 * /barbeiros/{id}:
 *   delete:
 *     summary: Remove um barbeiro
 *     tags: [Barbeiros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do barbeiro
 *     responses:
 *       204:
 *         description: Barbeiro removido com sucesso
 *       404:
 *         description: Barbeiro não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
barbeiroRouter.delete("/:id", deleteBarbeiro);
/**
 * @swagger
 * /barbeiros:
 *   get:
 *     summary: Lista todos os barbeiros
 *     tags: [Barbeiros]
 *     responses:
 *       200:
 *         description: Lista de barbeiros retornada com sucesso
 *       500:
 *         description: Erro interno do servidor
 */
barbeiroRouter.get("/", getAllBarbeiros);
/**
 * @swagger
 * /barbeiros/{id}:
 *   get:
 *     summary: Busca um barbeiro pelo ID
 *     tags: [Barbeiros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do barbeiro
 *     responses:
 *       200:
 *         description: Barbeiro encontrado
 *       404:
 *         description: Barbeiro não encontrado
 *       400:
 *         description: Requisição inválida
 *       500:
 *         description: Erro interno do servidor
 */
barbeiroRouter.get("/:id", getBarbeiro);
/**
 * @swagger
 * /barbeiros/{id}:
 *   put:
 *     summary: Atualiza um barbeiro existente
 *     tags: [Barbeiros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do barbeiro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               telefone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Barbeiro atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Barbeiro'
 *             example:
 *               id: 1
 *               nome: "João Atualizado"
 *               telefone: "11888888888"
 *               createdAt: "2025-10-05T12:00:00.000Z"
 *               updatedAt: "2025-10-05T12:10:00.000Z"
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Barbeiro não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
barbeiroRouter.put("/:id", updateBarbeiro);

/**
 * @swagger
 * components:
 *   schemas:
 *     BarbeiroInput:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *           example: "kleber"
 *         telefone:
 *           type: string
 *           example: "11999999999"
 *     Barbeiro:
 *       allOf:
 *         - $ref: '#/components/schemas/BarbeiroInput'
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
