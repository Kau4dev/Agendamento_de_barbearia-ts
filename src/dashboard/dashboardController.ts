import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getDashboardData = async (req: Request, res: Response) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const agendamentosHoje = await prisma.agendamento.count({
      where: {
        dataHora: {
          gte: today,
          lt: tomorrow,
        },
      },
    });

    const totalClientes = await prisma.usuario.count();
    const barbeirosAtivos = await prisma.barbeiro.count();

    const completedAgendamentos = await prisma.agendamento.findMany({
      where: {
        status: "CONCLUIDO",
        dataHora: {
          gte: new Date(today.getFullYear(), today.getMonth(), 1),
          lt: new Date(today.getFullYear(), today.getMonth() + 1, 1),
        },
      },
      include: {
        servico: true,
      },
    });

    const receitaMensal = completedAgendamentos.reduce(
      (total, agendamento) => total + agendamento.servico.preco,
      0
    );

    res.json({
      agendamentosHoje,
      totalClientes,
      barbeirosAtivos,
      receitaMensal,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
