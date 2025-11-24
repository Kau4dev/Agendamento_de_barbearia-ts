import { prisma } from "../config/prisma";
import type { CreateUsuarioInput, UpdateUsuarioInput } from "./UsuarioSchema";
import bcrypt from "bcryptjs"; // <--- MANTIDO para criptografar

// --- Funções de CRUD normais ---
export const getUsuarios = async () => {
  return await prisma.usuario.findMany();
};

export const getUsuarioById = async (id: number) => {
  return await prisma.usuario.findUnique({
    where: { id },
    select: {
      id: true,
      nome: true,
      email: true,
      telefone: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const createUsuario = async (data: CreateUsuarioInput) => {
  const { senha, ...resto } = data;
  const senhaHash = await bcrypt.hash(senha, 10);

  return await prisma.usuario.create({
    data: {
      ...resto,
      senha: senhaHash,
    },
  });
};

export const updateUsuario = async (id: number, data: UpdateUsuarioInput) => {
  const dataToUpdate: any = { ...data };

  if (data.senha) {
    dataToUpdate.senha = await bcrypt.hash(data.senha, 10);
  }

  return await prisma.usuario.update({
    where: { id },
    data: dataToUpdate,
  });
};

export const deleteUsuario = async (id: number) => {
  return await prisma.usuario.delete({
    where: { id },
  });
};

export const getUsuarioByEmail = async (email: string) => {
  return await prisma.usuario.findUnique({
    where: { email },
  });
};
