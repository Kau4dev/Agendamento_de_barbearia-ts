import { z } from "zod";

export const createAgendamentoSchema = z.object({
  clienteId: z.number().int().positive("clienteId é obrigatório."),
  barbeiroId: z.number().int().positive("barbeiroId é obrigatório."),
  servicoId: z.number().int().positive("servicoId é obrigatório."),
  dataHora: z.coerce
    .date()
    .refine((date) => date > new Date(), {
      message: "A data e hora do agendamento devem ser futuras",
    }),
});

export const updateStatusSchema = z.object({
  status: z.enum(["PENDENTE", "CONFIRMADO", "CANCELADO", "CONCLUIDO"]),
});

export const updateAgendamentoSchema = createAgendamentoSchema.partial();
