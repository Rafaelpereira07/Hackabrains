import { z } from 'zod';

export const createReportSchema = z.object({
  title: z.string().min(3, 'O título deve ter pelo menos 3 caracteres'),
  description: z.string().min(10, 'A descrição deve ser mais detalhada'),
  diagnosis: z.string().optional(),
  fileUrl: z
    .string()
    .url('URL do arquivo inválida')
    .optional()
    .or(z.literal('')),
  patientId: z.string().uuid('ID do paciente inválido'),
});
