import express from 'express';
import { imageViewer, uploadController } from '../controllers/uploadController';

export const uploadRouter = express.Router();

uploadRouter.post('/', uploadController);