import { prisma } from "../config/prisma";
import type {
  createBarbeiroInput,
  UpdateBarbeiroInput,
} from "./barbeiroSchema";

export const getBarbeiros = async () => {
  return await prisma.barbeiro.findMany({
    include: {
      agendamentos: {
        where: {
          dataHora: {
            gte: new Date(),
          },
        },
      },
    },
  });
};

export const getBarbeiroById = async (id: number) => {
  return await prisma.barbeiro.findUnique({
    where: { id },
    include: {
      agendamentos: true,
    },
  });
};

export const createBarbeiro = async (data: createBarbeiroInput) => {
  // Cria o barbeiro e sua agenda em uma transação
  return await prisma.barbeiro.create({
    data: {
      nome: data.nome,
      telefone: data.telefone,
      email: data.email ?? null,
      especialidade: data.especialidade ?? null,
      rating: data.rating ?? 0,
      agenda: {
        create: {
          // Horário padrão: 09:00 às 18:00 de segunda a sábado
          seg_inicio: "09:00",
          seg_fim: "18:00",
          ter_inicio: "09:00",
          ter_fim: "18:00",
          qua_inicio: "09:00",
          qua_fim: "18:00",
          qui_inicio: "09:00",
          qui_fim: "18:00",
          sex_inicio: "09:00",
          sex_fim: "18:00",
          sab_inicio: "09:00",
          sab_fim: "18:00",
          // Domingo fechado por padrão
          dom_inicio: null,
          dom_fim: null,
        },
      },
    },
    include: {
      agenda: true,
    },
  });
};

export const updateBarbeiro = async (id: number, data: UpdateBarbeiroInput) => {
  return await prisma.barbeiro.update({
    where: { id },
    data: {
      ...(data.nome !== undefined && { nome: data.nome }),
      ...(data.telefone !== undefined && { telefone: data.telefone }),
      ...(data.email !== undefined && { email: data.email }),
      ...(data.especialidade !== undefined && {
        especialidade: data.especialidade,
      }),
      ...(data.rating !== undefined && { rating: data.rating }),
    },
  });
};

export const deleteBarbeiro = async (id: number) => {
  return await prisma.barbeiro.delete({
    where: { id },
  });
};
