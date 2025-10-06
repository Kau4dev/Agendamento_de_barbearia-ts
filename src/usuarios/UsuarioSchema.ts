import { z } from "zod";

export const createUsuarioSchema = z.object({
  nome: z
    .string()
    .min(3, "Nome é obrigatório")
    .regex(
      /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/,
      "Nome deve conter apenas letras e espaços"
    ),
  email: z.string().email("Email inválido, exemplo: usuario@exemplo.com"),
  telefone: z
    .string()
    .min(9, "O telefone precisa ter no mínimo 9 digitos, exemplo: 11999999999"),
  senha: z
    .string()
    .min(6, "Senha deve ter no mínimo 6 caracteres")
    .max(50, "Senha deve ter no máximo 50 caracteres")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      "Senha deve conter ao menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial"
    ),
});

export const updateUsuarioSchema = z
  .object({
    nome: z
      .string()
      .min(3, "Nome é obrigatório")
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
    senha: z
      .string()
      .min(6, "Senha deve ter no mínimo 6 caracteres")
      .max(50, "Senha deve ter no máximo 50 caracteres")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        "Senha deve conter ao menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial"
      )
      .optional(),
  })
  .strict();

export type CreateUsuarioInput = z.infer<typeof createUsuarioSchema>;
export type UpdateUsuarioInput = z.infer<typeof updateUsuarioSchema>;

export default createUsuarioSchema;
