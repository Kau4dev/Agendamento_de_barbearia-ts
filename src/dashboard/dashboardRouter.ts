import { Router } from "express";
import { prisma } from "../config/prisma";

export const dashboardRouter = Router();

dashboardRouter.get("/stats", async (_req, res) => {
  try {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const amanha = new Date(hoje);
    amanha.setDate(amanha.getDate() + 1);

    const agendamentosHoje = await prisma.agendamento.count({
      where: {
        dataHora: {
          gte: hoje,
          lt: amanha,
        },
      },
    });

    const totalAgendamentos = await prisma.agendamento.count({
      where: {
        dataHora: {
          gte: new Date(),
        },
      },
    });

    const todosAgendamentos = await prisma.agendamento.findMany({
      where: {
        dataHora: {
          gte: new Date(),
        },
      },
      select: {
        id: true,
        dataHora: true,
        status: true,
      },
    });

    const totalClientes = await prisma.cliente.count();

    const barbeirosAtivos = await prisma.barbeiro.count();

    const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
    const fimMes = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);

    const agendamentosMes = await prisma.agendamento.findMany({
      where: {
        dataHora: {
          gte: inicioMes,
          lte: fimMes,
        },
        status: "CONCLUIDO",
      },
      include: {
        servico: true,
      },
    });

    const receitaMensal = agendamentosMes.reduce(
      (acc, ag) => acc + ag.servico.preco,
      0
    );

    const proximosAgendamentos = await prisma.agendamento.findMany({
      where: {
        dataHora: {
          gte: new Date(),
        },
      },
      include: {
        cliente: true,
        barbeiro: true,
        servico: true,
      },
      orderBy: {
        dataHora: "asc",
      },
      take: 5,
    });

    return res.json({
      agendamentosHoje,
      totalAgendamentos,
      totalClientes,
      barbeirosAtivos,
      receitaMensal,
      proximosAgendamentos: proximosAgendamentos.map((ag) => ({
        id: ag.id,
        date: ag.dataHora.toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
        time: ag.dataHora.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        client: ag.cliente.nome,
        barber: ag.barbeiro.nome,
        service: ag.servico.nome,
        status: ag.status.toLowerCase(),
      })),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao buscar estatísticas" });
  }
});
