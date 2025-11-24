import { prisma } from "../config/prisma";
import type { CreateClienteInput, UpdateClienteInput } from "./clienteSchema";

export const getClientes = async () => {
  return await prisma.cliente.findMany({
    include: {
      agendamentos: {
        include: {
          servico: true,
          barbeiro: true,
        },
      },
    },
  });
};

export const getClienteById = async (id: number) => {
  return await prisma.cliente.findUnique({
    where: { id },
    include: {
      agendamentos: {
        include: {
          servico: true,
          barbeiro: true,
        },
      },
    },
  });
};

export const createCliente = async (data: CreateClienteInput) => {
  return await prisma.cliente.create({
    data,
  });
};

export const updateCliente = async (id: number, data: UpdateClienteInput) => {
  return await prisma.cliente.update({
    where: { id },
    data: {
      ...(data.nome !== undefined && { nome: data.nome }),
      ...(data.email !== undefined && { email: data.email }),
      ...(data.telefone !== undefined && { telefone: data.telefone }),
    },
  });
};

export const deleteCliente = async (id: number) => {
  return await prisma.cliente.delete({
    where: { id },
  });
};
