
import { MongoClient, Db } from 'mongodb';

let client: MongoClient;
let db: Db;

const MONGODB_URI = 'mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/';
const DATABASE_NAME = 'ethiowork';

export const connectToDatabase = async () => {
  if (db) {
    return { client, db };
  }

  try {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    db = client.db(DATABASE_NAME);
    
    console.log('Connected to MongoDB');
    return { client, db };
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
};

export const getDatabase = () => {
  if (!db) {
    throw new Error('Database not connected. Call connectToDatabase first.');
  }
  return db;
};

export const closeDatabaseConnection = async () => {
  if (client) {
    await client.close();
    console.log('MongoDB connection closed');
  }
};
