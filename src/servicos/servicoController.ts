// Caminho: src/modules/servicos/servicoController.ts

import type { Request, Response } from "express";
import { ServicoService } from "./servicoService";

export const ServicoController = {
  // --- CRIAR ---
  create: async (req: Request, res: Response) => {
    try {
      const servico = await ServicoService.create(req.body);
      return res.status(201).json(servico);
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message || "Erro ao criar serviço." });
    }
  },

  // --- LISTAR TODOS ---
  findAll: async (_req: Request, res: Response) => {
    try {
      const servicos = await ServicoService.findAll();
      return res.status(200).json(servicos);
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: error.message || "Erro ao buscar serviços." });
    }
  },

  // --- BUSCAR POR ID ---
  findById: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "ID inválido." });
      }

      const servico = await ServicoService.findById(id);
      return res.status(200).json(servico);
    } catch (error: any) {
      if (error.message?.includes("não encontrado")) {
        return res.status(404).json({ message: error.message });
      }
      return res
        .status(400)
        .json({ message: error.message || "Erro ao buscar serviço." });
    }
  },

  // --- ATUALIZAR ---
  update: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "ID inválido." });
      }

      const servico = await ServicoService.update(id, req.body);
      return res.status(200).json(servico);
    } catch (error: any) {
      if (error.message?.includes("não encontrado")) {
        return res.status(404).json({ message: error.message });
      }
      return res
        .status(400)
        .json({ message: error.message || "Erro ao atualizar serviço." });
    }
  },

  // --- DELETAR ---
  delete: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "ID inválido." });
      }

      await ServicoService.delete(id);
      return res.status(204).send();
    } catch (error: any) {
      if (error.message?.includes("não encontrado")) {
        return res.status(404).json({ message: error.message });
      }
      return res
        .status(400)
        .json({ message: error.message || "Erro ao deletar serviço." });
    }
  },
};
