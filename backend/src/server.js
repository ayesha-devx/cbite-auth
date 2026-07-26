import dotenv from 'dotenv';
import http from 'http';
import mongoose from 'mongoose';
import app from './app.js';
import { connectDB } from './config/db.js';
import configureGooglePassport from './config/googlePassport.js';
import configureGitHubPassport from './config/githubPassport.js';

// 1. Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;

// Create HTTP Server
const server = http.createServer(app);
let serverInstance;

// Database clean disconnect helper
const disconnectDB = async () => {
  try {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
      console.log('[Process] MongoDB disconnected cleanly.');
    }
  } catch (error) {
    console.error('[Process] Error during MongoDB disconnection:', error);
  }
};

// Graceful shutdown helper
const shutdown = (reason, err) => {
  console.warn(`[Process] Shutting down due to: ${reason}`);
  if (err) {
    console.error(err);
  }

  // Stop accepting requests and close HTTP server
  if (serverInstance) {
    serverInstance.close(async () => {
      console.log('[Process] HTTP server closed.');
      // Disconnect database
      await disconnectDB();
      // Exit process
      process.exit(err ? 1 : 0);
    });
  } else {
    disconnectDB().then(() => {
      process.exit(err ? 1 : 0);
    });
  }

  // Force shutdown limit (10s)
  setTimeout(() => {
    console.error('[Process] Graceful shutdown timed out, force terminating.');
    process.exit(1);
  }, 10000);
};

// Process-level exception & rejection handling
process.on('uncaughtException', (err) => {
  shutdown('uncaughtException', err);
});

process.on('unhandledRejection', (reason) => {
  shutdown('unhandledRejection', reason instanceof Error ? reason : new Error(String(reason)));
});

// Signal listeners for system interrupts
process.on('SIGTERM', () => {
  shutdown('SIGTERM');
});

process.on('SIGINT', () => {
  shutdown('SIGINT');
});

// Bootstrap execution
const startServer = async () => {
  // Check for security configurations
  if (!process.env.OTP_HASH_SECRET) {
    console.error('[Startup Error] OTP_HASH_SECRET environment variable is missing or empty.');
    process.exit(1);
  }

  if (!process.env.JWT_SECRET) {
    console.error('[Startup Error] JWT_SECRET environment variable is missing or empty.');
    process.exit(1);
  }

  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || !process.env.GOOGLE_CALLBACK_URL) {
    console.error('[Startup Error] Google OAuth credentials (GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL) are missing or empty.');
    process.exit(1);
  }

  if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET || !process.env.GITHUB_CALLBACK_URL) {
    console.error('[Startup Error] GitHub OAuth credentials (GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GITHUB_CALLBACK_URL) are missing or empty.');
    process.exit(1);
  }

  // Initialize Google passport strategy now that environment variables are loaded
  configureGooglePassport();

  // Initialize GitHub passport strategy now that environment variables are loaded
  configureGitHubPassport();

  // 2. Connect MongoDB
  await connectDB();

  // 3. Start Express server
  serverInstance = server.listen(PORT, () => {
    console.log(`CBite API running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  });
};

startServer();
