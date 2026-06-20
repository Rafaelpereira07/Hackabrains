import { Router } from 'express';
import { createReport } from '../controllers/report.controller.js';
import { verifyToken, requireRole } from '../middlewares/auth.middleware.js';

const router = Router();

// Apenas médicos autenticados criam laudos
router.post('/', verifyToken, requireRole(['DOCTOR']), createReport);

export default router;
