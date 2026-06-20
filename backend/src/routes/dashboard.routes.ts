import { Router } from 'express';
import {
  getPatientDashboard,
  getDoctorDashboard,
  getAdminDashboard,
  toggleUserStatus,
} from '../controllers/dashboard.controller.js';
import { verifyToken, requireRole } from '../middlewares/auth.middleware.js';

const router = Router();

router.get(
  '/patient',
  verifyToken,
  requireRole(['PATIENT']),
  getPatientDashboard,
);
router.get('/doctor', verifyToken, requireRole(['DOCTOR']), getDoctorDashboard);

// Rotas do Administrador
router.get(
  '/admin/users',
  verifyToken,
  requireRole(['ADMIN']),
  getAdminDashboard,
);
router.patch(
  '/admin/users/:id/toggle',
  verifyToken,
  requireRole(['ADMIN']),
  toggleUserStatus,
);

export default router;
