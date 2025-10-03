import { prisma } from "../prismaClient.js";
import type {
  CreateUsuarioInput,
  UpdateUsuarioInput,
} from "./UsuarioSchema.js";

export const getUsuarios = async () => {
  return await prisma.usuario.findMany();
};

export const getUsuarioById = async (id: string) => {
  return await prisma.usuario.findUnique({
    where: { id },
  });
};

export const createUsuario = async (data: CreateUsuarioInput) => {
  return await prisma.usuario.create({
    data,
  });
};

export const updateUsuario = async (id: string, data: UpdateUsuarioInput) => {
  return await prisma.usuario.update({
    where: { id },
    data,
  });
};

export const deleteUsuario = async (id: string) => {
  return await prisma.usuario.delete({
    where: { id },
  });
};
