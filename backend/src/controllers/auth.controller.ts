import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { registerSchema, loginSchema } from '../schemas/auth.schema.js';
import { prisma } from '../../lib/prisma.js';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_key';

export const register = async (req: Request, res: Response) => {
  try {
    const validatedData = registerSchema.parse(req.body);
    const { email, password, role, firstName, lastName, cpf, ...rest } =
      validatedData;

    const emailExists = await prisma.user.findUnique({ where: { email } });
    if (emailExists)
      return res.status(400).json({ error: 'E-mail já cadastrado.' });

    // Apenas verifique CPF quando for um paciente (evita passar `undefined` ao Prisma)
    if (role === 'PATIENT') {
      const cpfExists = await prisma.patient.findUnique({ where: { cpf } });
      if (cpfExists) return res.status(400).json({ error: 'CPF já cadastrado.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // O Prisma permite criar o User e o Perfil associado na mesma query
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
        patientProfile:
          role === 'PATIENT'
            ? {
                create: {
                  firstName,
                  lastName,
                  cpf: cpf!,
                  dateOfBirth: new Date(rest.dateOfBirth!),
                  phone: rest.phone,
                },
              }
            : undefined,
        doctorProfile:
          role === 'DOCTOR'
            ? {
                create: {
                  firstName,
                  lastName,
                  specialty: rest.specialty!,
                  licenseNumber: rest.licenseNumber!,
                },
              }
            : undefined,
      },
      select: { id: true, email: true, role: true }, // Não retorna a senha
    });

    res.status(201).json({ message: 'Usuário criado com sucesso', user });
  } catch (error: any) {
    if (error.name === 'ZodError')
      return res.status(400).json({ errors: error.errors });
    res.status(500).json({ error: error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.isActive) {
      return res
        .status(401)
        .json({ error: 'Credenciais inválidas ou conta inativa.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    // Injetamos a Role diretamente no token para os middlewares usarem
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: '1d',
    });

    res.json({ message: 'Login bem-sucedido', token, role: user.role });
  } catch (error: any) {
    if (error.name === 'ZodError')
      return res.status(400).json({ errors: error.errors });
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};
