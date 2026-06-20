import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_key';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: 'PATIENT' | 'DOCTOR' | 'ADMIN';
  };
}

// Verifica se o usuário está logado
export const verifyToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res
      .status(401)
      .json({ error: 'Acesso negado. Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthRequest['user'];
    req.user = decoded; // O payload do JWT contém o ID e a Role
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido ou expirado.' });
  }
};

// Middleware para restringir rotas baseado na Role
export const requireRole = (roles: Array<'PATIENT' | 'DOCTOR' | 'ADMIN'>) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ error: 'Acesso negado. Permissão insuficiente.' });
    }
    next();
  };
};
