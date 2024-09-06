import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

dotenv.config();

import { uploadRouter } from './routes/upload';
import { confirmRouter } from './routes/confirm';
import { listRouter } from './routes/list';
import { connectDatabase } from './config/database';

const swaggerDefinition = {
        openapi: '3.0.0',
        info: {
            title: 'Water, Gas and Energy Measurement Reader',
            version: '1.0.0',
            description: 'API documentation for the project',
    },
};

const swaggerOptions = {
    swaggerDefinition,
    apis: ['/app/dist/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

const app = express();
const port = process.env.PORT || 80;

app.use(express.json({ limit: '50mb' }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/upload', uploadRouter);
app.use('/confirm', confirmRouter);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/', listRouter);

const startServer = async () => {
    try {
        await connectDatabase();
        console.log('Database connected');

        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};
if  (process.env.NODE_ENV !== 'test') {
    startServer();
}

export default app;