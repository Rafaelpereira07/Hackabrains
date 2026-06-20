import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware.js';
import { prisma } from '../../lib/prisma.js';
import { createReportSchema } from '../schemas/report.schema.js';

export const createReport = async (req: AuthRequest, res: Response) => {
  try {
    const validatedData = createReportSchema.parse(req.body);
    const userId = req.user?.id;

    // Busca o perfil de médico associado ao usuário logado
    const doctor = await prisma.doctor.findUnique({
      where: { userId },
    });

    if (!doctor) {
      return res
        .status(403)
        .json({ error: 'Perfil de médico não encontrado para este usuário.' });
    }

    // Verifica se o paciente alvo realmente existe
    const patientExists = await prisma.patient.findUnique({
      where: { id: validatedData.patientId },
    });

    if (!patientExists) {
      return res.status(444).json({ error: 'Paciente não encontrado.' });
    }

    const report = await prisma.report.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        diagnosis: validatedData.diagnosis,
        fileUrl: validatedData.fileUrl,
        patientId: validatedData.patientId,
        doctorId: doctor.id,
      },
    });

    res.status(201).json({ message: 'Laudo emitido com sucesso', report });
  } catch (error: any) {
    if (error.name === 'ZodError')
      return res.status(400).json({ errors: error.errors });
    res.status(500).json({ error: 'Erro interno ao emitir laudo.' });
  }
};
