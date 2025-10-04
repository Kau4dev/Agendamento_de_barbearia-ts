// src/modules/agendamentos/agendamento.service.ts
import { prisma } from "../config/prisma";
import { z } from "zod";
import {
  createAgendamentoSchema,
  updateAgendamentoSchema,
} from "./agendamentoSchema";

type CreateAgendamentoInput = z.infer<typeof createAgendamentoSchema>;
type UpdateAgendamentoInput = z.infer<typeof updateAgendamentoSchema>;

export class AgendamentoService {
  async create(data: CreateAgendamentoInput) {
    return prisma.agendamento.create({
      data: {
        usuarioId: data.usuarioId,
        servicoId: data.servicoId,
        barbeiroId: data.barbeiroId,
        dataHora: data.dataHora,
      },
    });
  }

  async findAll() {
    return prisma.agendamento.findMany({
      orderBy: {
        dataHora: "asc",
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
      data: {
        ...(data.usuarioId !== undefined && { usuarioId: data.usuarioId }),
        ...(data.servicoId !== undefined && { servicoId: data.servicoId }),
        ...(data.dataHora !== undefined && { dataHora: data.dataHora }),
      },
    });
  }

  async delete(id: number) {
    return prisma.agendamento.delete({
      where: { id },
    });
  }
}
