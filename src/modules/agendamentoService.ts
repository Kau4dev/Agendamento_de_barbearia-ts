// src/modules/agendamentos/agendamento.service.ts
import { prisma } from '../config/prisma.js'
import { z } from 'zod';
import { createAgendamentoSchema, updateAgendamentoSchema } from './agendamentoSchema.js';

// Tipagem dos dados de entrada
type CreateAgendamentoInput = z.infer<typeof createAgendamentoSchema>;
type UpdateAgendamentoInput = z.infer<typeof updateAgendamentoSchema>;

export class AgendamentoService {
  async create(data: CreateAgendamentoInput) {
    return prisma.agendamento.create({ data });
  }

  async findAll() {
    return prisma.agendamento.findMany({
      orderBy: {
        dataHora: 'asc', // Lista os agendamentos por data
      },
    });
  }

  async findById(id: number) {
    return prisma.agendamento.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: UpdateAgendamentoInput) {
    return prisma.agendamento.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return prisma.agendamento.delete({
      where: { id },
    });
  }
}