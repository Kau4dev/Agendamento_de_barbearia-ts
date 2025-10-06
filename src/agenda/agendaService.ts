import { prisma } from "../config/prisma";
import type { UpdateAgendaBody } from "./agendaSchema";

class AgendaService {
  public async getOrCreateAgendaByBarbeiroId(barbeiroId: number) {
    const barbeiro = await prisma.barbeiro.findUnique({
      where: { id: barbeiroId },
    });

    if (!barbeiro) {
      throw new Error("Barbeiro não encontrado");
    }

    const agenda = await prisma.agenda.findUnique({
      where: {
        barbeiroId: barbeiroId,
      },
    });

    if (!agenda) {
      const novaAgenda = await prisma.agenda.create({
        data: {
          barbeiroId: barbeiroId,
        },
      });
      return novaAgenda;
    }

    return agenda;
  }

  public async updateAgenda(barbeiroId: number, data: UpdateAgendaBody) {
    const prismaUpdateData: Record<string, any> = {};
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        prismaUpdateData[key] = value === null ? { set: null } : { set: value };
      }
    });

    const agendaAtualizada = await prisma.agenda.upsert({
      where: {
        barbeiroId: barbeiroId,
      },
      update: prismaUpdateData,
      create: {
        barbeiroId: barbeiroId,
        ...Object.fromEntries(
          Object.entries(data).map(([key, value]) => [
            key,
            value === undefined ? null : value,
          ])
        ),
      },
    });

    return agendaAtualizada;
  }
}

export default new AgendaService();
