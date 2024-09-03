import express from 'express';
import { listController } from '../controllers/listController';

export const listRouter = express.Router();

/**
 * @swagger
 * /{customerCode}/list:
 *   get:
 *     summary: Retorna a lista de medições para um cliente específico
 *     parameters:
 *       - in: path
 *         name: customerCode
 *         required: true
 *         schema:
 *           type: string
 *         description: O código do cliente
 *       - in: query
 *         name: measure_type
 *         required: false
 *         schema:
 *           type: string
 *           enum: [water, gas, energy]
 *         description: O tipo de medição (opcional)
 *     responses:
 *       200:
 *         description: Lista de medições retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   measure_uuid:
 *                     type: string
 *                     description: O UUID da medição
 *                   value:
 *                     type: number
 *                     description: O valor da medição
 *                   measure_type:
 *                     type: string
 *                     description: O tipo de medição (água ou gás)
 *                   confirmed:
 *                     type: boolean
 *                     description: Se a medição foi confirmada ou não
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
 *         description: Nenhuma medição encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error_code:
 *                   type: string
 *                   example: MEASURES_NOT_FOUND
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

listRouter.get('/:customerCode/list', listController);