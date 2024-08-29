import { Request, Response } from 'express';
import { confirmService } from '../services/confirmService';

export const confirmController = async (req: Request, res: Response) => {
    try {
        const { measure_uuid, confirmed_value } = req.body;
        await confirmService(measure_uuid, confirmed_value);
        res.status(200).json({ success: true });
    } catch (error) {
        if (error instanceof Error) {
            if (error.message === 'Invalid input') {
                res.status(400).json({ error_code: 'INVALID_DATA', error_description: error.message });
            } else if (error.message === 'Measurement not found') {
                res.status(404).json({ error_code: 'MEASURE_NOT_FOUND', error_description: error.message });
            } else if (error.message === 'Measurement already confirmed') {
                res.status(409).json({ error_code: 'CONFIRMATION_DUPLICATE', error_description: error.message });
            } else {
                res.status(500).json({ error_code: 'SERVER_ERROR', error_description: 'An unexpected error occurred' });
            }
        }
    }
};