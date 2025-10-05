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
 *             barbeiroId: 2
 *             servicoId: 3
 *             dataHora: "2025-10-10T14:00:00.000Z"
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
 *               barbeiroId: 2
 *               servicoId: 3
 *               data: "2025-10-10T14:00:00.000Z"
 *               createdAt: "2025-10-05T12:00:00.000Z"
 *               updatedAt: "2025-10-05T12:00:00.000Z"
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
 *             barbeiroId: 2
 *             servicoId: 3
 *             data: "2025-10-11T15:00:00.000Z"
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
 *               barbeiroId: 2
 *               servicoId: 3
 *               data: "2025-10-11T15:00:00.000Z"
 *               createdAt: "2025-10-05T12:00:00.000Z"
 *               updatedAt: "2025-10-05T12:10:00.000Z"
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

export default agendamentoRouter;
