import { Request, Response } from "express";
import { notificacoesService } from "./notificacoesService";

export const notificacoesController = {
  async getRecentes(req: Request, res: Response) {
    try {
      const notificacoes = await notificacoesService.getNotificacoesRecentes();
      res.json(notificacoes);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Erro ao buscar notificações";
      res.status(500).json({ error: message });
    }
  },
};
