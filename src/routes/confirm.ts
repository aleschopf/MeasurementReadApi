import express from 'express';
import { confirmController } from '../controllers/confirmController';

export const confirmRouter = express.Router();

confirmRouter.patch('/', confirmController);