import { Router } from "express";
import { avaliacaoController } from "./avaliacaoController";

const router = Router();

/**
 * @swagger
 * /barbeiros/{barbeiroId}/avaliacoes:
 *   post:
 *     summary: Criar avaliação para um barbeiro
 *     tags: [Avaliações]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: barbeiroId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nota
 *             properties:
 *               nota:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               comentario:
 *                 type: string
 *               agendamentoId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Avaliação criada com sucesso
 */
router.post("/:barbeiroId/avaliacoes", avaliacaoController.criar);

/**
 * @swagger
 * /barbeiros/{barbeiroId}/avaliacoes:
 *   get:
 *     summary: Listar avaliações de um barbeiro
 *     tags: [Avaliações]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: barbeiroId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de avaliações
 */
router.get("/:barbeiroId/avaliacoes", avaliacaoController.listarPorBarbeiro);

/**
 * @swagger
 * /agendamentos/{agendamentoId}/pode-avaliar:
 *   get:
 *     summary: Verificar se pode avaliar um agendamento
 *     tags: [Avaliações]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: agendamentoId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Retorna se pode avaliar
 */
router.get(
  "/agendamentos/:agendamentoId/pode-avaliar",
  avaliacaoController.verificarPodeAvaliar
);

export default router;
