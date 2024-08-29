import express from 'express';
import { listController } from '../controllers/listController';

export const listRouter = express.Router();

listRouter.get('/:customerCode/list', listController);