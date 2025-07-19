import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

interface Config {
    port: number;
    nodeEnv: string;
    mongoURI: string;
};

const config: Config = {
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    mongoURI: process.env.ATLAS_URI_PERSONAL || '',
}

if (!config.mongoURI) {
    throw new Error('ATLAS_URI_PERSONAL is not defined in environment variables');
}

export const mongoConnect = async () => {
    try {
        await mongoose.connect(config.mongoURI);
        console.log('Connected to MongoDB Atlas');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};
export default config;