import mongoose from 'mongoose';

/**
 * Connects to MongoDB database.
 * If connection fails, logs the error and shuts down the process to prevent partial boot.
 */
export const connectDB = async () => {
  try {
    const dbUri = process.env.MONGODB_URI;
    if (!dbUri) {
      throw new Error('MONGODB_URI environment variable is missing or empty.');
    }

    const conn = await mongoose.connect(dbUri);
    
    // Log the connection success securely (omitting credentials)
    console.log(`MongoDB connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[Database Error] Connection failed: ${error.message}`);
    process.exit(1);
  }
};
