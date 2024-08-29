import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

import { uploadRouter } from './routes/upload';
import { confirmRouter } from './routes/confirm';
import { listRouter } from './routes/list';
import { connectDatabase } from './config/database';


const app = express();
const port = process.env.PORT || 80;

app.use(express.json({ limit: '50mb' }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/upload', uploadRouter);
app.use('/confirm', confirmRouter);
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

startServer();

export default app;