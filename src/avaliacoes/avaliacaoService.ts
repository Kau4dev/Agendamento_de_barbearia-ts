import { prisma } from "../config/prisma";

export const avaliacaoService = {
  async criarAvaliacao(data: {
    nota: number;
    comentario?: string | undefined;
    barbeiroId: number;
    clienteId: number;
    agendamentoId?: number | undefined;
  }) {
    if (data.agendamentoId) {
      const avaliacaoExistente = await prisma.avaliacao.findUnique({
        where: { agendamentoId: data.agendamentoId },
      });

      if (avaliacaoExistente) {
        throw new Error("Este agendamento já foi avaliado");
      }
    }

    const avaliacao = await prisma.avaliacao.create({
      data: {
        nota: data.nota,
        comentario: data.comentario ?? null,
        barbeiroId: data.barbeiroId,
        clienteId: data.clienteId,
        agendamentoId: data.agendamentoId ?? null,
      },
    });

    // Recalcular rating médio do barbeiro
    await this.atualizarRatingBarbeiro(data.barbeiroId);

    return avaliacao;
  },

  async atualizarRatingBarbeiro(barbeiroId: number) {
    const avaliacoes = await prisma.avaliacao.findMany({
      where: { barbeiroId },
      select: { nota: true },
    });

    if (avaliacoes.length === 0) {
      await prisma.barbeiro.update({
        where: { id: barbeiroId },
        data: { rating: 0 },
      });
      return;
    }

    const somaNotas = avaliacoes.reduce((acc, av) => acc + av.nota, 0);
    const media = somaNotas / avaliacoes.length;

    await prisma.barbeiro.update({
      where: { id: barbeiroId },
      data: { rating: parseFloat(media.toFixed(2)) },
    });
  },

  async listarAvaliacoesBarbeiro(barbeiroId: number) {
    return prisma.avaliacao.findMany({
      where: { barbeiroId },
      orderBy: { createdAt: "desc" },
      take: 50,
    });
  },

  async verificarPodeAvaliar(agendamentoId: number) {
    const agendamento = await prisma.agendamento.findUnique({
      where: { id: agendamentoId },
      select: { status: true },
    });

    if (!agendamento) {
      throw new Error("Agendamento não encontrado");
    }

    if (agendamento.status !== "CONCLUIDO") {
      throw new Error("Só é possível avaliar agendamentos concluídos");
    }

    const avaliacaoExistente = await prisma.avaliacao.findUnique({
      where: { agendamentoId },
    });

    return !avaliacaoExistente;
  },
};
