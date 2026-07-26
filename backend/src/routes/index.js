import { Router } from 'express';
import mongoose from 'mongoose';
import authRoutes from './auth.routes.js';

const router = Router();

// GET /api/health
router.get('/health', (req, res) => {
  const connectionStates = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };
  
  const dbStatus = connectionStates[mongoose.connection.readyState] || 'unknown';

  res.status(200).json({
    success: true,
    message: 'CBite API is running',
    database: dbStatus,
    environment: process.env.NODE_ENV || 'development',
  });
});

// Mount /api/auth routes
router.use('/auth', authRoutes);

export default router;
