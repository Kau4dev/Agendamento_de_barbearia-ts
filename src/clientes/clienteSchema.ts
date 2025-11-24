import { z } from "zod";

export const createClienteSchema = z.object({
  nome: z
    .string()
    .min(3, { message: "O nome precisa ter no mínimo 3 caracteres" })
    .regex(
      /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/,
      "Nome deve conter apenas letras e espaços"
    ),
  email: z.string().email("Email inválido"),
  telefone: z
    .string()
    .min(9, "O telefone precisa ter no mínimo 9 digitos, exemplo: 11999999999"),
});

export const updateClienteSchema = z
  .object({
    nome: z
      .string()
      .min(3, { message: "O nome precisa ter no mínimo 3 caracteres" })
      .regex(
        /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/,
        "Nome deve conter apenas letras e espaços"
      )
      .optional(),
    email: z.string().email("Email inválido").optional(),
    telefone: z
      .string()
      .min(
        9,
        "O telefone precisa ter no mínimo 9 digitos, exemplo: 11999999999"
      )
      .optional(),
  })
  .strict();

export type CreateClienteInput = z.infer<typeof createClienteSchema>;
export type UpdateClienteInput = z.infer<typeof updateClienteSchema>;
