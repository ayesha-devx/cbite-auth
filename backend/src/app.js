import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import apiRoutes from './routes/index.js';
import errorMiddleware from './middleware/error.middleware.js';

const app = express();

// Set HTTP security headers
app.use(helmet());

// Configure request logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Configure CORS (Must handle credentials, no wildcard origins)
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

// Body parsers with safe size limits (10kb)
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Parse incoming cookies
app.use(cookieParser());

app.use(passport.initialize());

// Mount API routes under /api
app.use('/api', apiRoutes);

// Handle 404 requests (non-existent routes)
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Centralized error handler middleware
app.use(errorMiddleware);

export default app;
