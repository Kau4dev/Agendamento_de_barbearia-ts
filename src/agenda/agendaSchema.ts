import { z } from 'zod';

const timeFormat = z.string().regex(/^\d{2}:\d{2}$/, {
  message: 'O formato da hora deve ser "HH:mm"',
});

export const updateAgendaSchema = z.object({
  body: z.object({
    seg_inicio: timeFormat.optional().nullable(),
    seg_fim: timeFormat.optional().nullable(),
    
    ter_inicio: timeFormat.optional().nullable(),
    ter_fim: timeFormat.optional().nullable(),
    
    qua_inicio: timeFormat.optional().nullable(),
    qua_fim: timeFormat.optional().nullable(),
    
    qui_inicio: timeFormat.optional().nullable(),
    qui_fim: timeFormat.optional().nullable(),
    
    sex_inicio: timeFormat.optional().nullable(),
    sex_fim: timeFormat.optional().nullable(),
    
    sab_inicio: timeFormat.optional().nullable(),
    sab_fim: timeFormat.optional().nullable(),
    
    dom_inicio: timeFormat.optional().nullable(),
    dom_fim: timeFormat.optional().nullable(),
  }),
});

export type UpdateAgendaBody = z.infer<typeof updateAgendaSchema>['body'];