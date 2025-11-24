import { z } from "zod";

export const avaliacaoSchema = z.object({
  nota: z.number().int().min(1, "Nota mínima é 1").max(5, "Nota máxima é 5"),
  comentario: z.string().optional(),
  barbeiroId: z.number().int().positive(),
  clienteId: z.number().int().positive(),
  agendamentoId: z.number().int().positive().optional(),
});

export const criarAvaliacaoSchema = z.object({
  nota: z.number().int().min(1, "Nota mínima é 1").max(5, "Nota máxima é 5"),
  comentario: z.string().optional(),
  agendamentoId: z.number().int().positive().optional(),
});

export type AvaliacaoInput = z.infer<typeof avaliacaoSchema>;
export type CriarAvaliacaoInput = z.infer<typeof criarAvaliacaoSchema>;
