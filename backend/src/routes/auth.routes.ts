import { Router } from 'express';
import { register, login } from '../controllers/auth.controller.js';
import { verifyToken, requireRole } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);

// Exemplo de rota protegida apenas para DOCTORS
router.get(
  '/doctor-dashboard',
  verifyToken,
  requireRole(['DOCTOR']),
  (req, res) => {
    res.json({ message: 'Bem-vindo ao painel do médico.' });
  },
);

// Exemplo de rota apenas para ADMINS (criados manualmente via BD)
router.get('/admin-panel', verifyToken, requireRole(['ADMIN']), (req, res) => {
  res.json({ message: 'Bem-vindo ao painel de administração.' });
});

export default router;
