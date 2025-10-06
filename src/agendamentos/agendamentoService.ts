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
    const agenda = await prisma.agenda.findUnique({
      where: { barbeiroId: data.barbeiroId },
    });
    if (!agenda) {
      throw new Error("Barbeiro não possui agenda cadastrada.");
    }

    const dataHora =
      data.dataHora instanceof Date ? data.dataHora : new Date(data.dataHora);
    const diaSemana = dataHora.getDay();

    const dias = [
      { inicio: agenda.dom_inicio, fim: agenda.dom_fim },
      { inicio: agenda.seg_inicio, fim: agenda.seg_fim },
      { inicio: agenda.ter_inicio, fim: agenda.ter_fim },
      { inicio: agenda.qua_inicio, fim: agenda.qua_fim },
      { inicio: agenda.qui_inicio, fim: agenda.qui_fim },
      { inicio: agenda.sex_inicio, fim: agenda.sex_fim },
      { inicio: agenda.sab_inicio, fim: agenda.sab_fim },
    ];
    const dia = dias[diaSemana];
    if (!dia || !dia.inicio || !dia.fim) {
      throw new Error("Barbeiro não atende nesse dia.");
    }
    const { inicio, fim } = dia;

    const [inicioHora, inicioMin] = inicio.split(":").map(Number);
    const [fimHora, fimMin] = fim.split(":").map(Number);
    const inicioExpediente = new Date(dataHora);
    inicioExpediente.setHours(inicioHora ?? 0, inicioMin ?? 0, 0, 0);
    const fimExpediente = new Date(dataHora);
    fimExpediente.setHours(fimHora ?? 0, fimMin ?? 0, 0, 0);

    if (dataHora < inicioExpediente || dataHora > fimExpediente) {
      throw new Error("Horário fora do expediente do barbeiro.");
    }

    const servico = await prisma.servico.findUnique({
      where: { id: data.servicoId },
    });
    if (!servico) throw new Error("Serviço não encontrado.");

    const inicioNovo = dataHora;
    const fimNovo = new Date(dataHora.getTime() + servico.duracao * 60000);

    const agendamentosConflitantes = await prisma.agendamento.findMany({
      where: {
        barbeiroId: data.barbeiroId,
        OR: [
          {
            AND: [
              { dataHora: { lte: inicioNovo } },
              {
                servico: {
                  duracao: { gt: 0 },
                },
              },
            ],
          },
          {
            dataHora: { lt: fimNovo, gte: inicioNovo },
          },
        ],
      },
      include: { servico: true },
    });

    const conflito = agendamentosConflitantes.some((ag) => {
      const agInicio = ag.dataHora;
      const agFim = new Date(
        ag.dataHora.getTime() + ag.servico.duracao * 60000
      );
      return inicioNovo < agFim && fimNovo > agInicio;
    });
    if (conflito) {
      throw new Error("Já existe um agendamento nesse intervalo.");
    }

    return prisma.agendamento.create({
      data: {
        usuarioId: data.usuarioId,
        servicoId: data.servicoId,
        barbeiroId: data.barbeiroId,
        dataHora: dataHora,
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
        ...(data.barbeiroId !== undefined && { barbeiroId: data.barbeiroId }),
        ...(data.dataHora !== undefined && { dataHora: data.dataHora }),
      },
    });
  }

  async updateStatus(
    id: number,
    status: "PENDENTE" | "CONFIRMADO" | "CANCELADO" | "CONCLUIDO"
  ) {
    const agendamento = await prisma.agendamento.findUnique({ where: { id } });
    if (!agendamento) {
      throw new Error("Agendamento não encontrado.");
    }
    return prisma.agendamento.update({
      where: { id },
      data: { status },
    });
  }

  async delete(id: number) {
    return prisma.agendamento.delete({
      where: { id },
    });
  }
}
