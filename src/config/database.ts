import { createConnection, Connection } from 'typeorm';
import { Measurement } from '../models/Measurement';

export const connectDatabase = async (): Promise<Connection> => {
    return createConnection({
        type: 'sqlite',
        database: 'shopper.sqlite',
        entities: [Measurement],
        synchronize: true,
        logging: true
    });
};