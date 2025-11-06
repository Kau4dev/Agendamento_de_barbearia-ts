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

export const getUsuarioByEmail = async (email: string) => {
  return await prisma.usuario.findUnique({
    where: { email },
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
  const dataToUpdate: any = {
    nome: data.nome,
    telefone: data.telefone,
  };

 
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

