import bcrypt from 'bcrypt';
import { prisma } from '../lib/prisma';
import { Role } from '../generated/prisma/enums';

async function main() {
  console.log('🌱 Iniciando seed...');

  // Limpa o banco na ordem correta (respeita FK)
  await prisma.report.deleteMany();
  await prisma.doctor.deleteMany();
  await prisma.patient.deleteMany();
  await prisma.user.deleteMany();

  const SALT_ROUNDS = 10;

  // ── Admin ──────────────────────────────────────────────────────────────────
  await prisma.user.create({
    data: {
      email: 'admin@clinica.com',
      password: await bcrypt.hash('Admin@123', SALT_ROUNDS),
      role: Role.ADMIN,
    },
  });

  // ── Médico ─────────────────────────────────────────────────────────────────
  const doctorUser = await prisma.user.create({
    data: {
      email: 'doctor@clinica.com',
      password: await bcrypt.hash('Doctor@123', SALT_ROUNDS),
      role: Role.DOCTOR,
      doctorProfile: {
        create: {
          firstName: 'Carlos',
          lastName: 'Souza',
          specialty: 'Cardiologia',
          licenseNumber: 'CRM-123456',
        },
      },
    },
    include: { doctorProfile: true },
  });

  // ── Paciente ───────────────────────────────────────────────────────────────
  const patientUser = await prisma.user.create({
    data: {
      email: 'patient@clinica.com',
      password: await bcrypt.hash('Patient@123', SALT_ROUNDS),
      role: Role.PATIENT,
      patientProfile: {
        create: {
          firstName: 'Ana',
          lastName: 'Lima',
          cpf: '123.456.789-00',
          dateOfBirth: new Date('1990-05-15'),
          phone: '(51) 99999-0000',
        },
      },
    },
    include: { patientProfile: true },
  });

  // ── Laudo de exemplo ───────────────────────────────────────────────────────
  await prisma.report.create({
    data: {
      title: 'Eletrocardiograma - Rotina',
      description: 'Exame de rotina sem alterações significativas.',
      diagnosis: 'Sinus rhythm normal. Sem indícios de arritmia.',
      patientId: patientUser.patientProfile!.id,
      doctorId: doctorUser.doctorProfile!.id,
    },
  });

  console.log('✅ Seed concluído com sucesso!');
  console.log('\nCredenciais de acesso:');
  console.log('  Admin   → admin@clinica.com   / Admin@123');
  console.log('  Médico  → doctor@clinica.com  / Doctor@123');
  console.log('  Paciente→ patient@clinica.com / Patient@123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
