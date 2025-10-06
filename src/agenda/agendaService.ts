import prisma from '../prisma'; 
import type { UpdateAgendaBody } from './agendaSchema.js';

class AgendaService {
  public async getOrCreateAgendaByBarbeiroId(barbeiroId: number) {
    
    const barbeiro = await prisma.barbeiro.findUnique({
      where: { id: barbeiroId },
    });

    if (!barbeiro) {
      throw new Error('Barbeiro não encontrado');
    }

    
    const agenda = await prisma.agenda.findUnique({
      where: {
        barbeiroId: barbeiroId,
      },
    });

   le
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