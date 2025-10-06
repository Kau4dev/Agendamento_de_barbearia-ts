import { Router } from "express";
import { AgendamentoController } from "./agendamentoController";

const agendamentoRouter = Router();
const controller = new AgendamentoController();

/**
 * @swagger
 * tags:
 *   name: Agendamentos
 *   description: Gerenciamento de agendamentos
 */

/**
 * @swagger
 * /agendamentos:
 *   post:
 *     summary: Cria um novo agendamento
 *     tags: [Agendamentos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AgendamentoInput'
 *           example:
 *             usuarioId: 1
 *             barbeiroId: 1
 *             servicoId: 1
 *             dataHora: "2025-11-10T14:00:00.000Z"
 *     responses:
 *       201:
 *         description: Agendamento criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agendamento'
 *             example:
 *               id: 10
 *               usuarioId: 1
 *               barbeiroId: 1
 *               servicoId: 1
 *               data: "2025-11-10T14:00:00.000Z"
 *               createdAt: "2025-11-05T12:00:00.000Z"
 *               updatedAt: "2025-11-05T12:10:00.000Z"
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */
agendamentoRouter.post("/", controller.create);

/**
 * @swagger
 * /agendamentos:
 *   get:
 *     summary: Lista todos os agendamentos
 *     tags: [Agendamentos]
 *     responses:
 *       200:
 *         description: Lista de agendamentos retornada com sucesso
 *       500:
 *         description: Erro interno do servidor
 */
agendamentoRouter.get("/", controller.listAll);

/**
 * @swagger
 * /agendamentos/{id}:
 *   get:
 *     summary: Busca um agendamento pelo ID
 *     tags: [Agendamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do agendamento
 *     responses:
 *       200:
 *         description: Agendamento encontrado
 *       404:
 *         description: Agendamento não encontrado
 *       400:
 *         description: Requisição inválida
 *       500:
 *         description: Erro interno do servidor
 */
agendamentoRouter.get("/:id", controller.getById);

/**
 * @swagger
 * /agendamentos/{id}:
 *   put:
 *     summary: Atualiza um agendamento existente
 *     tags: [Agendamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do agendamento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AgendamentoInput'
 *           example:
 *             usuarioId: 1
 *             barbeiroId: 1
 *             servicoId: 1
 *             dataHora: "2025-11-11T15:00:00.000Z"
 *     responses:
 *       200:
 *         description: Agendamento atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agendamento'
 *             example:
 *               id: 10
 *               usuarioId: 1
 *               barbeiroId: 1
 *               servicoId: 1
 *               dataHora: "2025-11-11T15:00:00.000Z"
 *               createdAt: "2025-11-05T12:00:00.000Z"
 *               updatedAt: "2025-11-05T12:10:00.000Z"
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Agendamento não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
agendamentoRouter.put("/:id", controller.update);

/**
 * @swagger
 * /agendamentos/{id}/status:
 *   patch:
 *     summary: Atualiza apenas o status de um agendamento
 *     tags: [Agendamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do agendamento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [PENDENTE, CONFIRMADO, CANCELADO, CONCLUIDO]
 *                 example: CONFIRMADO
 *     responses:
 *       200:
 *         description: Status atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agendamento'
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Agendamento não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
agendamentoRouter.patch("/:id/status", controller.updateStatus);

/**
 * @swagger
 * /agendamentos/{id}:
 *   delete:
 *     summary: Remove um agendamento
 *     tags: [Agendamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do agendamento
 *     responses:
 *       204:
 *         description: Agendamento removido com sucesso
 *       404:
 *         description: Agendamento não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
agendamentoRouter.delete("/:id", controller.delete);

/**
 * @swagger
 * components:
 *   schemas:
 *     AgendamentoInput:
 *       type: object
 *       properties:
 *         usuarioId:
 *           type: integer
 *           example: 1
 *         barbeiroId:
 *           type: integer
 *           example: 1
 *         servicoId:
 *           type: integer
 *           example: 1
 *         dataHora:
 *           type: string
 *           format: date-time
 *           example: "2025-11-10T14:00:00.000Z"
 *     Agendamento:
 *       allOf:
 *         - $ref: '#/components/schemas/AgendamentoInput'
 *         - type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 10
 *             status:
 *               type: string
 *               enum: [PENDENTE, CONFIRMADO, CANCELADO, CONCLUIDO]
 *               example: PENDENTE
 *             createdAt:
 *               type: string
 *               format: date-time
 *               example: "2025-11-05T12:00:00.000Z"
 *             updatedAt:
 *               type: string
 *               format: date-time
 *               example: "2025-11-05T12:10:00.000Z"
 */

export default agendamentoRouter;
