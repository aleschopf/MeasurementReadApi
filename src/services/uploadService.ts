import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { analyzeImage } from './geminiService';
import { saveMeasurement, getMeasurements } from '../models/Measurement';

export const uploadService = async (image: string, customerCode: string, measureDatetime: string, measureType: string) => {
    if (!image || !customerCode || !measureDatetime || !measureType) {
        throw new Error('Missing required fields');
    }
    
    const imageName = `${uuidv4()}.jpg`;
    const imagePath = path.join(__dirname, '../uploads', imageName);
    await saveBase64Image(image, imagePath);

    const existingMeasurements = await getMeasurements(customerCode, measureType);
    const thisMonth = new Date(measureDatetime).getMonth();
    const thisYear = new Date(measureDatetime).getFullYear();
    const alreadyReported = existingMeasurements.some(m =>
        m.measureDatetime.getMonth() === thisMonth && m.measureDatetime.getFullYear() === thisYear
    );

    if (alreadyReported) {
        throw new Error('A reading for this month and type already exists');
    }

    const measureValue = await analyzeImage(image);

    const imageUrl = `http://localhost/uploads/${imageName}`;

    const measurement = await saveMeasurement(customerCode, measureDatetime, measureType, measureValue, imageUrl);

    return {
        image_url: imageUrl,
        measure_value: measureValue,
        measure_uuid: measurement.id
    };
};

const saveBase64Image = (base64Image: string, filePath: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        const base64Data = base64Image.replace(/^data:image\/jpeg;base64,/, "");

        fs.writeFile(filePath, base64Data, 'base64', (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};