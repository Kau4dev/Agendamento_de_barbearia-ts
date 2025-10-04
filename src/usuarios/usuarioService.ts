import { prisma } from "../config/prismaClient";
import type { CreateUsuarioInput, UpdateUsuarioInput } from "./UsuarioSchema";

export const getUsuarios = async () => {
  return await prisma.usuario.findMany();
};

export const getUsuarioById = async (id: number) => {
  return await prisma.usuario.findUnique({
    where: { id },
  });
};

export const createUsuario = async (data: CreateUsuarioInput) => {
  return await prisma.usuario.create({
    data,
  });
};

export const updateUsuario = async (id: number, data: UpdateUsuarioInput) => {
  return await prisma.usuario.update({
    where: { id },
    data: {
      ...(data.nome !== undefined && { nome: data.nome }),
      ...(data.telefone !== undefined && { telefone: data.telefone }),
      ...(data.senha !== undefined && { senha: data.senha }),
    },
  });
};

export const deleteUsuario = async (id: number) => {
  return await prisma.usuario.delete({
    where: { id },
  });
};
