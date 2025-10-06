import { z } from "zod";

export const createServicoSchema = z.object({
  nome: z
    .string()
    .min(3, { message: "O nome precisa ter no mínimo 3 caracteres" }),
  preco: z
    .number()
    .positive({ message: "O preço deve ser um número positivo" }),
  duracao: z
    .number()
    .int({ message: "A duração deve ser um número inteiro" })
    .positive({ message: "A duração deve ser um número positivo" }),
  descricao: z.string().optional(),
});

export const updateServicoSchema = z.object({
  params: z.object({
    id: z
      .string()
      .regex(/^\d+$/, { message: "O ID deve ser um número" })
      .transform(Number),
  }),
  body: z.object({
    nome: z
      .string()
      .min(3, { message: "O nome precisa ter no mínimo 3 caracteres" })
      .optional(),
    preco: z
      .number()
      .positive({ message: "O preço deve ser um número positivo" })
      .optional(),
    duracao: z
      .number()
      .int({ message: "A duração deve ser um número inteiro" })
      .positive({ message: "A duração deve ser um número positivo" })
      .optional(),
    descricao: z.string().optional(),
  }),
});
