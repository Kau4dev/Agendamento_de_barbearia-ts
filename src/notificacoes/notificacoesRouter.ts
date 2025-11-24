import { Router } from "express";
import { notificacoesController } from "./notificacoesController";

const router = Router();

/**
 * @swagger
 * /notificacoes:
 *   get:
 *     summary: Buscar notificações recentes
 *     tags: [Notificações]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de notificações das últimas 24 horas
 */
router.get("/", notificacoesController.getRecentes);

export default router;
