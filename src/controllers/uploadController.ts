import { Request, Response } from 'express';
import { uploadService } from '../services/uploadService';
import fs from 'fs';
import path from 'path';

export const uploadController = async (req: Request, res: Response) => {
    try {
        const { image, customer_code, measure_datetime, measure_type } = req.body;
        const result = await uploadService(image, customer_code, measure_datetime, measure_type);
        res.status(200).json(result);
    } catch (error) {
        console.log(error)
        if (error instanceof Error) {
            if (error.message === 'Missing required fields') {
                res.status(400).json({ error_code: 'INVALID_DATA', error_description: error.message });
            } else if (error.message === 'A reading for this month and type already exists') {
                res.status(409).json({ error_code: 'DOUBLE_REPORT', error_description: error.message });
            } else {
                res.status(500).json({ error_code: 'SERVER_ERROR', error_description: 'An unexpected error occurred' });
            }
    }
    }
};

export const imageViewer = (req: Request, res: Response) => {
    const imageName = req.params.imagename;
    const imagePath = path.join(__dirname, '..', 'uploads', imageName);

    // Check if file exists
    if (fs.existsSync(imagePath)) {
        // Set the appropriate content type
        res.contentType('image/jpeg');

        // Stream the file to the response
        const stream = fs.createReadStream(imagePath);
        stream.pipe(res);
    } else {
        res.status(404).send('Image not found');
    }
};