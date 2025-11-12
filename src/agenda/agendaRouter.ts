import { Router } from "express";
import AgendaController from "./agendaController";
import { authMiddleware } from "../middlewares/authMiddleware";

const agendaRouter = Router();

agendaRouter.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: Agenda
 *   description: Gerenciamento de agenda semanal dos barbeiros
 */

/**
 * @swagger
 * /agendas/{barbeiroId}:
 *   get:
 *     summary: Busca a agenda de um barbeiro
 *     tags: [Agenda]
 *     parameters:
 *       - in: path
 *         name: barbeiroId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do barbeiro
 *     responses:
 *       200:
 *         description: Agenda encontrada ou criada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agenda'
 *             example:
 *               id: 1
 *               barbeiroId: 2
 *               seg_inicio: "09:00"
 *               seg_fim: "18:00"
 *               ter_inicio: "09:00"
 *               ter_fim: "18:00"
 *               qua_inicio: "09:00"
 *               qua_fim: "18:00"
 *               qui_inicio: "09:00"
 *               qui_fim: "18:00"
 *               sex_inicio: "09:00"
 *               sex_fim: "18:00"
 *               sab_inicio: "10:00"
 *               sab_fim: "14:00"
 *               dom_inicio: null
 *               dom_fim: null
 *               createdAt: "2025-10-05T12:00:00.000Z"
 *               updatedAt: "2025-10-05T12:00:00.000Z"
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Barbeiro não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

agendaRouter.get("/:barbeiroId", (req, res, next) =>
  AgendaController.getOrCreateAgenda(req, res, next)
);
/**
 * @swagger
 * /agendas/{barbeiroId}:
 *   put:
 *     summary: Cria ou atualiza a agenda de um barbeiro
 *     tags: [Agenda]
 *     parameters:
 *       - in: path
 *         name: barbeiroId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do barbeiro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AgendaInput'
 *           example:
 *             seg_inicio: "09:00"
 *             seg_fim: "18:00"
 *             sab_inicio: "10:00"
 *             sab_fim: "14:00"
 *     responses:
 *       200:
 *         description: Agenda criada ou atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agenda'
 *             example:
 *               id: 1
 *               barbeiroId: 2
 *               seg_inicio: "09:00"
 *               seg_fim: "18:00"
 *               sab_inicio: "10:00"
 *               sab_fim: "14:00"
 *               createdAt: "2025-10-05T12:00:00.000Z"
 *               updatedAt: "2025-10-05T12:10:00.000Z"
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Barbeiro não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

agendaRouter.put("/:barbeiroId", (req, res, next) =>
  AgendaController.updateAgenda(req, res, next)
);
/**
 * @swagger
 * components:
 *   schemas:
 *     AgendaInput:
 *       type: object
 *       properties:
 *         seg_inicio:
 *           type: string
 *           example: "09:00"
 *         seg_fim:
 *           type: string
 *           example: "18:00"
 *         ter_inicio:
 *           type: string
 *           example: "09:00"
 *         ter_fim:
 *           type: string
 *           example: "18:00"
 *         qua_inicio:
 *           type: string
 *           example: "09:00"
 *         qua_fim:
 *           type: string
 *           example: "18:00"
 *         qui_inicio:
 *           type: string
 *           example: "09:00"
 *         qui_fim:
 *           type: string
 *           example: "18:00"
 *         sex_inicio:
 *           type: string
 *           example: "09:00"
 *         sex_fim:
 *           type: string
 *           example: "18:00"
 *         sab_inicio:
 *           type: string
 *           example: "10:00"
 *         sab_fim:
 *           type: string
 *           example: "14:00"
 *         dom_inicio:
 *           type: string
 *           example: null
 *         dom_fim:
 *           type: string
 *           example: null
 *     Agenda:
 *       allOf:
 *         - $ref: '#/components/schemas/AgendaInput'
 *         - type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 1
 *             barbeiroId:
 *               type: integer
 *               example: 2
 *             createdAt:
 *               type: string
 *               format: date-time
 *               example: "2025-10-05T12:00:00.000Z"
 *             updatedAt:
 *               type: string
 *               format: date-time
 *               example: "2025-10-05T12:10:00.000Z"
 */

export default agendaRouter;
