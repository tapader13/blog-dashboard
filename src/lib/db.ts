import mongoose from 'mongoose';

let isConnected = false;

export const connectDb = async () => {
  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI as string);
    console.log('MongoDB connected:', db.connection.host);
    isConnected = true;
  } catch (error: any) {
    console.error(error.message);
  }
};
