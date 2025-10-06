import { z } from "zod";

export const createBarbeiroSchema = z.object({
  nome: z
    .string()
    .min(3, { message: "O nome precisa ter no mínimo 3 caracteres" })
    .regex(
      /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/,
      "Nome deve conter apenas letras e espaços"
    ),
  telefone: z
    .string()
    .min(9, "O telefone precisa ter no mínimo 9 digitos, exemplo: 11999999999"),
});

export const updateBarbeiroSchema = z
  .object({
    nome: z
      .string()
      .min(3, { message: "O nome precisa ter no mínimo 3 caracteres" })
      .regex(
        /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/,
        "Nome deve conter apenas letras e espaços"
      )
      .optional(),
    telefone: z
      .string()
      .min(
        9,
        "O telefone precisa ter no mínimo 9 digitos, exemplo: 11999999999"
      )
      .optional(),
  })
  .strict();

export type createBarbeiroInput = z.infer<typeof createBarbeiroSchema>;
export type UpdateBarbeiroInput = z.infer<typeof updateBarbeiroSchema>;

export default createBarbeiroSchema;
