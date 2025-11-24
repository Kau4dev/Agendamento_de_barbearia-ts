import { Request, Response } from "express";
import { avaliacaoService } from "./avaliacaoService";
import { criarAvaliacaoSchema } from "./avaliacaoSchema";

export const avaliacaoController = {
  async criar(req: Request, res: Response) {
    try {
      const { barbeiroId } = req.params;
      if (!barbeiroId) {
        return res.status(400).json({ error: "BarbeiroId não fornecido" });
      }

      const parsed = criarAvaliacaoSchema.parse(req.body);

      const clienteId = (req as any).user?.id;
      if (!clienteId) {
        return res.status(401).json({ error: "Usuário não autenticado" });
      }

      const payload: any = {
        nota: parsed.nota,
        barbeiroId: parseInt(barbeiroId, 10),
        clienteId,
      };
      if (parsed.comentario) payload.comentario = parsed.comentario;
      if (parsed.agendamentoId) payload.agendamentoId = parsed.agendamentoId;

      const avaliacao = await avaliacaoService.criarAvaliacao(payload);

      res.status(201).json(avaliacao);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: "Erro ao criar avaliação" });
    }
  },

  async listarPorBarbeiro(req: Request, res: Response) {
    try {
      const { barbeiroId } = req.params;
      if (!barbeiroId) {
        return res.status(400).json({ error: "BarbeiroId não fornecido" });
      }
      const avaliacoes = await avaliacaoService.listarAvaliacoesBarbeiro(
        parseInt(barbeiroId, 10)
      );
      res.json(avaliacoes);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Erro ao buscar avaliações";
      res.status(500).json({ error: message });
    }
  },

  async verificarPodeAvaliar(req: Request, res: Response) {
    try {
      const { agendamentoId } = req.params;
      if (!agendamentoId) {
        return res.status(400).json({ error: "AgendamentoId não fornecido" });
      }
      const podeAvaliar = await avaliacaoService.verificarPodeAvaliar(
        parseInt(agendamentoId, 10)
      );
      res.json({ podeAvaliar });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: "Erro ao verificar avaliação" });
    }
  },
};
