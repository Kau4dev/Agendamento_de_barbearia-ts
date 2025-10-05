// src/middlewares/validate.ts

import type { Request, Response, NextFunction } from 'express';
import type { AnyZodObject } from 'zod';

export const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Passamos o 'req' inteiro.
      // Se o schema tiver um '.body', o Zod vai procurar por 'req.body'.
      // Se tiver um '.params', o Zod vai procurar por 'req.params'.
      // Isso torna o middleware muito mais flexível e correto.
      await schema.parseAsync(req);

      return next();
    } catch (error) {
      return res.status(400).json(error);
    }
  };