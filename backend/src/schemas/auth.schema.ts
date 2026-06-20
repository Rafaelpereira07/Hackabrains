import { z } from 'zod';

export const registerSchema = z
  .object({
    email: z.string().email('E-mail inválido'),
    password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
    role: z.enum(['PATIENT', 'DOCTOR']), // ADMIN não pode ser criado via API
    firstName: z.string().min(2, 'Nome obrigatório'),
    lastName: z.string().min(2, 'Sobrenome obrigatório'),

    // Campos de Paciente
    cpf: z.string().optional(),
    dateOfBirth: z.string().optional(), // Recebe como string e converte depois
    phone: z.string().optional(),

    // Campos de Médico
    specialty: z.string().optional(),
    licenseNumber: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.role === 'PATIENT') {
      if (!data.cpf)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'CPF é obrigatório para pacientes',
          path: ['cpf'],
        });
      if (!data.dateOfBirth)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Data de nascimento é obrigatória para pacientes',
          path: ['dateOfBirth'],
        });
    }
    if (data.role === 'DOCTOR') {
      if (!data.specialty)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Especialidade é obrigatória para médicos',
          path: ['specialty'],
        });
      if (!data.licenseNumber)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'CRM (licenseNumber) é obrigatório para médicos',
          path: ['licenseNumber'],
        });
    }
  });

export const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
});
