import { prisma } from "../config/prisma";
import { z } from "zod";
import { createServicoSchema, updateServicoSchema } from "./servicoSchema";

type CreateServicoData = z.infer<typeof createServicoSchema>;
type UpdateServicoData = z.infer<typeof updateServicoSchema>["body"];

export const ServicoService = {
  create: async (data: CreateServicoData) => {
    const servicoExistente = await prisma.servico.findUnique({
      where: { nome: data.nome },
    });
    if (servicoExistente) {
      throw new Error("Já existe um serviço cadastrado com este nome.");
    }
    return prisma.servico.create({
      data: {
        nome: data.nome,
        preco: data.preco,
        duracao: data.duracao,
        descricao: data.descricao !== undefined ? data.descricao : null,
      },
    });
  },

  findAll: async () => {
    return prisma.servico.findMany();
  },

  findById: async (id: number) => {
    const servico = await prisma.servico.findUnique({
      where: { id },
      include: {
        agendamentos: true,
      },
    });
    if (!servico) {
      throw new Error("Serviço não encontrado.");
    }
    return servico;
  },

  update: async (id: number, data: UpdateServicoData) => {
    const servicoExistente = await prisma.servico.findUnique({ where: { id } });
    if (!servicoExistente) {
      throw new Error("Serviço não encontrado para atualização.");
    }
    return prisma.servico.update({
      where: { id },
      data: {
        ...(data.nome !== undefined && { nome: data.nome }),
        ...(data.preco !== undefined && { preco: data.preco }),
        ...(data.duracao !== undefined && { duracao: data.duracao }),
        ...(data.descricao !== undefined && { descricao: data.descricao }),
      },
    });
  },

  delete: async (id: number) => {
    const servicoExistente = await prisma.servico.findUnique({ where: { id } });
    if (!servicoExistente) {
      throw new Error("Serviço não encontrado para exclusão.");
    }
    await prisma.servico.delete({ where: { id } });
  },
};
