import { prisma } from "../config/prisma";
import type { CreateUsuarioInput, UpdateUsuarioInput } from "./UsuarioSchema";
import bcrypt from "bcryptjs";

export const getUsuarios = async () => {
  return await prisma.usuario.findMany();
};

export const getUsuarioById = async (id: number) => {
  return await prisma.usuario.findUnique({
    where: { id },
    include: {
      agendamentos: true,
    },
  });
};

export const createUsuario = async (data: CreateUsuarioInput) => {
  const hashedPassword = await bcrypt.hash(data.senha, 10);
  return await prisma.usuario.create({
    data: {
      ...data,
      senha: hashedPassword,
    },
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
