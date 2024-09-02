import { createConnection, Connection } from 'typeorm';
import { Measurement } from '../models/Measurement';
import dotenv from 'dotenv';

dotenv.config();

export const connectDatabase = async (): Promise<Connection> => {
    return createConnection({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT!),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [Measurement],
        synchronize: true,
        logging: true,
    });
};