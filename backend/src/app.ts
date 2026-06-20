import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import reportRoutes from './routes/report.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';
import cors from "cors"

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Registro de Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/dashboards', dashboardRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
