import { z } from "zod";


export const loginUsuarioSchema = z.object({
  email: z.string().email("Email inválido"),
  senha: z.string().min(1, "Senha é obrigatória"),
});

export type LoginUsuarioInput = z.infer<typeof loginUsuarioSchema>;