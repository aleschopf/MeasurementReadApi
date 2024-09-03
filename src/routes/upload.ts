import express from 'express';
import { imageViewer, uploadController } from '../controllers/uploadController';

export const uploadRouter = express.Router();

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Faz o upload de uma imagem de medição
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: base64
 *                 description: A imagem da medição em formato base64
 *               customer_code:
 *                 type: string
 *                 description: Código do cliente relacionado à medição
 *               measure_datetime:
 *                 type: string
 *                 format: date-time
 *                 description: Data e hora da medição
 *               measure_type:
 *                 type: string
 *                 enum: [water, gas, energy]
 *                 description: Tipo da medição (água ou gás)
 *     responses:
 *       200:
 *         description: Upload realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica se o upload foi bem-sucedido
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: ID da medição criada
 *       400:
 *         description: Dados inválidos fornecidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error_code:
 *                   type: string
 *                   example: INVALID_DATA
 *                 error_description:
 *                   type: string
 *       409:
 *         description: Já existe uma leitura para este mês e tipo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error_code:
 *                   type: string
 *                   example: DOUBLE_REPORT
 *                 error_description:
 *                   type: string
 *       500:
 *         description: Erro inesperado no servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error_code:
 *                   type: string
 *                   example: SERVER_ERROR
 *                 error_description:
 *                   type: string
 */

uploadRouter.post('/', uploadController);

/**
 * @swagger
 * /uploads/{imagename}:
 *   get:
 *     summary: Visualiza uma imagem de medição específica
 *     parameters:
 *       - in: path
 *         name: imagename
 *         required: true
 *         schema:
 *           type: string
 *         description: O nome da imagem a ser visualizada
 *     responses:
 *       200:
 *         description: Imagem retornada com sucesso
 *         content:
 *           image/jpeg:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Imagem não encontrada
 */

uploadRouter.get('/uploads/:imagename', imageViewer);