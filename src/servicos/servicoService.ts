// Caminho: src/modules/servicos/servicoService.ts

import { prisma } from '../prismaClient.js';
import { z } from 'zod';
import { createServicoSchema, updateServicoSchema } from './servicosSchema.js'; // <-- AJUSTADO

// Tipos para facilitar a organização do código
type CreateServicoData = z.infer<typeof createServicoSchema>['body'];
type UpdateServicoData = z.infer<typeof updateServicoSchema>['body'];

export const ServicoService = {
  // --- CRIAR ---
  create: async (data: CreateServicoData) => {
    const servicoExistente = await prisma.Servico.findUnique({ where: { nome: data.nome } });
    if (servicoExistente) {
      throw new Error('Já existe um serviço cadastrado com este nome.');
    }
    return prisma.Servico.create({ data });
  },

  // --- LISTAR TODOS ---
  findAll: async () => {
    return prisma.Servico.findMany();
  },

  // --- BUSCAR POR ID ---
  findById: async (id: number) => {
    const servico = await prisma.Servico.findUnique({ where: { id } });
    if (!servico) {
      throw new Error('Serviço não encontrado.');
    }
    return servico;
  },

  // --- ATUALIZAR ---
  update: async (id: number, data: UpdateServicoData) => {
    const servicoExistente = await prisma.servico.findUnique({ where: { id } });
    if (!servicoExistente) {
      throw new Error('Serviço não encontrado para atualização.');
    }
    return prisma.servico.update({
      where: { id },
      data: data,
    });
  },

  // --- DELETAR ---
  delete: async (id: number) => {
    const servicoExistente = await prisma.servico.findUnique({ where: { id } });
    if (!servicoExistente) {
      throw new Error('Serviço não encontrado para exclusão.');
    }
    await prisma.servico.delete({ where: { id } });
  },
};
