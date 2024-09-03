import { createConnection, Connection } from 'typeorm';
import { Measurement } from '../models/Measurement';
import dotenv from 'dotenv';

dotenv.config();

export const connectDatabase = async (): Promise<Connection> => {
    let connection: Connection | null = null;

    while (!connection) {
        try {
            connection = await createConnection({
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
            console.log('Conexão com o banco de dados estabelecida com sucesso.');
        } catch (error) {
            console.error('Erro ao conectar ao banco de dados. Tentando novamente em 3 segundos...', error);
            await new Promise((resolve) => setTimeout(resolve, 3000));
        }
    }

    return connection;
};
