import { prisma } from "../config/prisma";
import type {
  createBarbeiroInput,
  UpdateBarbeiroInput,
} from "./barbeiroSchema";

export const getBarbeiros = async () => {
  return await prisma.barbeiro.findMany();
};

export const getBarbeiroById = async (id: number) => {
  return await prisma.barbeiro.findUnique({
    where: { id },
  });
};

export const createBarbeiro = async (data: createBarbeiroInput) => {
  return await prisma.barbeiro.create({
    data,
  });
};

export const updateBarbeiro = async (id: number, data: UpdateBarbeiroInput) => {
  return await prisma.barbeiro.update({
    where: { id },
    data: {
      ...(data.nome !== undefined && { nome: data.nome }),
      ...(data.telefone !== undefined && { telefone: data.telefone }),
    },
  });
};

export const deleteBarbeiro = async (id: number) => {
  return await prisma.barbeiro.delete({
    where: { id },
  });
};
