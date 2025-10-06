import { Request, Response, NextFunction } from "express";
import AgendaService from "./agendaService";
import { updateAgendaSchema } from "./agendaSchema";

class AgendaController {
  async getOrCreateAgenda(req: Request, res: Response, next: NextFunction) {
    try {
      const barbeiroId = Number(req.params.barbeiroId);
      if (isNaN(barbeiroId)) {
        return res.status(400).json({ message: "ID do barbeiro inválido." });
      }
      const agenda = await AgendaService.getOrCreateAgendaByBarbeiroId(
        barbeiroId
      );
      return res.json(agenda);
    } catch (error: any) {
      if (error.message === "Barbeiro não encontrado") {
        return res.status(404).json({ message: error.message });
      }
      next(error);
    }
  }

  async updateAgenda(req: Request, res: Response, next: NextFunction) {
    try {
      const barbeiroId = Number(req.params.barbeiroId);
      if (isNaN(barbeiroId)) {
        return res.status(400).json({ message: "ID do barbeiro inválido." });
      }
      const parse = updateAgendaSchema.safeParse(req.body);
      if (!parse.success) {
        return res.status(400).json({
          message: "Erro de validação.",
          errors: parse.error.flatten().fieldErrors,
        });
      }
      const agenda = await AgendaService.updateAgenda(barbeiroId, parse.data);
      return res.json(agenda);
    } catch (error: any) {
      next(error);
    }
  }
}

export default new AgendaController();
