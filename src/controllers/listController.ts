import { Request, Response } from 'express';
import { listService } from '../services/listService';

export const listController = async (req: Request, res: Response) => {
    try {
        const { customerCode } = req.params;
        const { measure_type } = req.query;
        const result = await listService(customerCode, measure_type as string);
        res.status(200).json(result);
    } catch (error) {
        if (error instanceof Error) {
            if (error.message === 'Customer code is required') {
                res.status(400).json({ error_code: 'INVALID_DATA', error_description: error.message });
            } else if (error.message === 'Invalid measure type') {
                res.status(400).json({ error_code: 'INVALID_TYPE', error_description: error.message });
            } else if (error.message === 'No measurements found') {
                res.status(404).json({ error_code: 'MEASURES_NOT_FOUND', error_description: error.message });
            } else {
                res.status(500).json({ error_code: 'SERVER_ERROR', error_description: 'An unexpected error occurred' });
            }
        }
    }
};