// src/modules/agendamentos/agendamento.controller.ts
import type { Request, Response, NextFunction } from 'express';
import { AgendamentoService } from './agendamentoService.js';
import { createAgendamentoSchema, updateAgendamentoSchema } from './agendamentoSchema.js';

const agendamentoService = new AgendamentoService();

export class AgendamentoController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = createAgendamentoSchema.parse(req.body);
      const novoAgendamento = await agendamentoService.create(validatedData);
      res.status(201).json(novoAgendamento);
    } catch (error) {
      next(error);
    }
  }

  async listAll(req: Request, res: Response, next: NextFunction) {
    try {
      const agendamentos = await agendamentoService.findAll();
      res.status(200).json(agendamentos);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id ?? '', 10);
      const agendamento = await agendamentoService.findById(id);
      if (!agendamento) {
        return res.status(404).json({ message: 'Agendamento não encontrado.' });
      }
      res.status(200).json(agendamento);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id ?? '', 10);
      const validatedData = updateAgendamentoSchema.parse(req.body);
      const agendamentoAtualizado = await agendamentoService.update(id, validatedData);
      res.status(200).json(agendamentoAtualizado);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id ?? '', 10);
      await agendamentoService.delete(id);
      res.status(204).send(); // 204 No Content
    } catch (error) {
      next(error);
    }
  }
}