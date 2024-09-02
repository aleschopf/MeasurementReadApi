import express from 'express';
import { confirmController } from '../controllers/confirmController';

export const confirmRouter = express.Router();

/**
 * @swagger
 * /confirm:
 *   patch:
 *     summary: Confirma o valor de uma medição
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               measure_uuid:
 *                 type: string
 *                 description: O UUID da medição a ser confirmada
 *               confirmed_value:
 *                 type: number
 *                 description: O valor confirmado da medição
 *     responses:
 *       200:
 *         description: Confirmação bem-sucedida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
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
 *       404:
 *         description: Medição não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error_code:
 *                   type: string
 *                   example: MEASURE_NOT_FOUND
 *                 error_description:
 *                   type: string
 *       409:
 *         description: Medição já confirmada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error_code:
 *                   type: string
 *                   example: CONFIRMATION_DUPLICATE
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

confirmRouter.patch('/', confirmController);