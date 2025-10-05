import { z } from "zod";

export const createAgendamentoSchema = z.object({
  usuarioId: z.number().int().positive("usuarioId é obrigatório."),
  barbeiroId: z.number().int().positive("barbeiroId é obrigatório."),
  servicoId: z.number().int().positive("servicoId é obrigatório."),
  dataHora: z.coerce.date(),
});

export const updateAgendamentoSchema = createAgendamentoSchema.partial();
