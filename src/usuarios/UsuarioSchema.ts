import { z } from "zod";

export const createUsuarioSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  telefone: z.string().min(9, "Telefone inválido"),
  senha: z
    .string()
    .min(6, "Senha deve ter no mínimo 6 caracteres")
    .max(50, "Senha deve ter no máximo 100 caracteres"),
});

export const updateUsuarioSchema = z
  .object({
    nome: z.string().min(1, "Nome é obrigatório").optional(),
    telefone: z.string().min(9, "Telefone inválido").optional(),
    senha: z
      .string()
      .min(6, "Senha deve ter no mínimo 6 caracteres")
      .max(50, "Senha deve ter no máximo 50 caracteres")
      .optional(),
  })
  .strict();

export type CreateUsuarioInput = z.infer<typeof createUsuarioSchema>;
export type UpdateUsuarioInput = z.infer<typeof updateUsuarioSchema>;

export default createUsuarioSchema;
