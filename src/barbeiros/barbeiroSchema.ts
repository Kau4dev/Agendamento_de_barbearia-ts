import { z } from "zod";

export const createBarbeiroSchema = z.object({
  nome: z
    .string()
    .min(3, { message: "O nome precisa ter no mínimo 3 caracteres" }),
  telefone: z
    .string()
    .min(9, { message: "O telefone precisa ter no mínimo 9 digitos" }),
});

export const updateBarbeiroSchema = z
  .object({
    nome: z
      .string()
      .min(3, { message: "O nome precisa ter no mínimo 3 caracteres" })
      .optional(),
    telefone: z
      .string()
      .min(9, { message: "O telefone precisa ter no mínimo 9 digitos" })
      .optional(),
  })
  .strict();

export type createBarbeiroInput = z.infer<typeof createBarbeiroSchema>;
export type UpdateBarbeiroInput = z.infer<typeof updateBarbeiroSchema>;

export default createBarbeiroSchema;
