// src/middlewares/errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';

export function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
  // Erro de validação do Zod
  if (error instanceof ZodError) {
    return res.status(400).json({
      message: 'Erro de validação.',
      errors: error.flatten().fieldErrors,
    });
  }

  // Erro do Prisma para "registro não encontrado"
  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
    return res.status(404).json({
      message: 'O registro solicitado não foi encontrado.',
    });
  }

  // Outros erros
  console.error(error); // Loga o erro no console para debug
  return res.status(500).json({ message: 'Ocorreu um erro interno no servidor.' });
}