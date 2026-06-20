import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware.js';
import { prisma } from '../../lib/prisma.js';

// 1. Dashboard do Paciente: Histórico de laudos próprios
export const getPatientDashboard = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    const patient = await prisma.patient.findUnique({
      where: { userId },
      include: {
        reports: {
          orderBy: { createdAt: 'desc' },
          include: {
            doctor: {
              select: { firstName: true, lastName: true, specialty: true },
            },
          },
        },
      },
    });

    if (!patient)
      return res
        .status(444)
        .json({ error: 'Perfil de paciente não encontrado.' });

    res.json({
      profile: { firstName: patient.firstName, lastName: patient.lastName },
      reportsHistory: patient.reports,
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao carregar dashboard do paciente.' });
  }
};

// 2. Dashboard do Médico: Lista de pacientes atendidos (que já possuem laudos criados por ele)
export const getDoctorDashboard = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    const doctor = await prisma.doctor.findUnique({ where: { userId } });
    if (!doctor)
      return res
        .status(444)
        .json({ error: 'Perfil de médico não encontrado.' });

    // Busca pacientes que possuem pelo menos um laudo com este médico
    const attendedPatients = await prisma.patient.findMany({
      where: {
        reports: {
          some: { doctorId: doctor.id },
        },
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        phone: true,
        createdAt: true,
      },
      orderBy: { firstName: 'asc' },
    });

    res.json({
      doctor: { firstName: doctor.firstName, specialty: doctor.specialty },
      patientsCount: attendedPatients.length,
      attendedPatients,
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao carregar dashboard do médico.' });
  }
};

// 3. Dashboard do Admin: Listar todos os usuários com seus respectivos perfis
export const getAdminDashboard = async (req: AuthRequest, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        patientProfile: {
          select: { firstName: true, lastName: true, cpf: true },
        },
        doctorProfile: {
          select: {
            firstName: true,
            lastName: true,
            licenseNumber: true,
            specialty: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ totalUsers: users.length, users });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Erro ao carregar dashboard do administrador.' });
  }
};

// 4. Ação do Admin: Alternar status ativo/inativo (isActive) de um usuário
export const toggleUserStatus = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string; // ID do usuário que será alterado
    const { isActive } = req.body; // Novo valor booleano esperado

    if (typeof isActive !== 'boolean') {
      return res.status(400).json({
        error: 'O campo isActive deve ser um booleano (true ou false).',
      });
    }

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user)
      return res.status(444).json({ error: 'Usuário não encontrado.' });

    if (user.role === 'ADMIN') {
      return res.status(403).json({
        error:
          'Não é permitido desativar contas de administradores por esta rota.',
      });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { isActive },
      select: { id: true, email: true, isActive: true },
    });

    res.json({
      message: `Conta do usuário foi ${isActive ? 'ativada' : 'desativada'} com sucesso.`,
      updatedUser,
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao alterar o status do usuário.' });
  }
};
