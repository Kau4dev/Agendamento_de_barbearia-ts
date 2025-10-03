// src/modules/agendamento.schema.ts
import { z } from 'zod';

export const createAgendamentoSchema = z.object({
  // min(3) já garante que o campo não é vazio, então só precisamos de uma mensagem.
  nomeCliente: z.string().min(3, 'Nome do cliente deve ter no mínimo 3 caracteres.'),
  
  // Usamos min(1) para garantir que o campo é obrigatório e não está vazio.
  telefoneCliente: z.string().min(1, 'Telefone do cliente é obrigatório.'),
  nomeBarbeiro: z.string().min(1, 'Nome do barbeiro é obrigatório.'),
  nomeServico: z.string().min(1, 'Nome do serviço é obrigatório.'),

  // As validações de número e data já estavam corretas.
  duracaoEmMinutos: z.number().int().positive('A duração deve ser um número positivo.'),
  precoServico: z.number().positive('O preço deve ser um número positivo.'),
  dataHora: z.coerce.date().refine((val) => val instanceof Date && !isNaN(val.getTime()), {
    message: 'A data e hora são obrigatórias.',
  }),
});

// Para o update, todos os campos são opcionais
export const updateAgendamentoSchema = createAgendamentoSchema.partial();