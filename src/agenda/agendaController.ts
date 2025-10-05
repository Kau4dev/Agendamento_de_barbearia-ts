import prisma from '../prisma'; // Ajuste o caminho se necessário
import { UpdateAgendaBody } from './agendaSchema.js';

class AgendaService {
  public async getOrCreateAgendaByBarbeiroId(barbeiroId: number) {
    // 1. Verifica se o barbeiro realmente existe
    const barbeiro = await prisma.barbeiro.findUnique({
      where: { id: barbeiroId },
    });

    if (!barbeiro) {
      throw new Error('Barbeiro não encontrado');
    }

    // 2. Tenta encontrar a agenda do barbeiro
    const agenda = await prisma.agenda.findUnique({
      where: {
        barbeiroId: barbeiroId,
      },
    });

    // 3. Se não houver agenda, cria uma nova e vazia para ele
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
    // A função 'upsert' do Prisma é ideal aqui:
    // - 'update': O que fazer se encontrar a agenda.
    // - 'create': O que fazer se NÃO encontrar a agenda.
    // Isso evita que a gente precise verificar se o barbeiro existe primeiro.
    const agendaAtualizada = await prisma.agenda.upsert({
      where: {
        barbeiroId: barbeiroId,
      },
      update: data,
      create: {
        barbeiroId: barbeiroId,
        ...data,
      },
    });

    return agendaAtualizada;
  }
}

export default new AgendaService();