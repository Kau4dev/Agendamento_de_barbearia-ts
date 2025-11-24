import { prisma } from "../config/prisma";

export const notificacoesService = {
  async getNotificacoesRecentes() {
    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const agendamentos = await prisma.agendamento.findMany({
      where: {
        OR: [
          {
            createdAt: {
              gte: twentyFourHoursAgo,
            },
          },
          {
            status: "CANCELADO",
            updatedAt: {
              gte: twentyFourHoursAgo,
            },
          },
        ],
      },
      include: {
        cliente: {
          select: {
            id: true,
            nome: true,
          },
        },
        barbeiro: {
          select: {
            id: true,
            nome: true,
          },
        },
        servico: {
          select: {
            id: true,
            nome: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 20,
    });

    return agendamentos.map((agendamento) => {
      const isCancelado = agendamento.status === "CANCELADO";
      return {
        id: agendamento.id,
        tipo: isCancelado ? "CANCELAMENTO" : "NOVO_AGENDAMENTO",
        titulo: isCancelado ? "Agendamento Cancelado" : "Novo Agendamento",
        mensagem: isCancelado
          ? `${
              agendamento.cliente?.nome || "Cliente"
            } cancelou o agendamento de ${
              agendamento.servico?.nome || "serviço"
            } com ${agendamento.barbeiro?.nome || "barbeiro"}`
          : `${agendamento.cliente?.nome || "Cliente"} agendou ${
              agendamento.servico?.nome || "serviço"
            } com ${agendamento.barbeiro?.nome || "barbeiro"}`,
        dataHora: agendamento.dataHora,
        createdAt: agendamento.createdAt,
        lida: false,
        agendamentoId: agendamento.id,
        clienteNome: agendamento.cliente?.nome,
        barbeiroNome: agendamento.barbeiro?.nome,
        servicoNome: agendamento.servico?.nome,
        status: agendamento.status,
      };
    });
  },
};
