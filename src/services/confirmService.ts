import { confirmMeasurement, getMeasurementByUuid } from '../models/Measurement';

export const confirmService = async (measureUuid: string, confirmedValue: number) => {
    if (!measureUuid || typeof confirmedValue !== 'number') {
        throw new Error('Invalid input');
    }


    const measurement = await getMeasurementByUuid(measureUuid);
    if (!measurement) {
        throw new Error('Measurement not found');
    }
    if (measurement.confirmed) {
        throw new Error('Measurement already confirmed');
    }

    await confirmMeasurement(measureUuid, confirmedValue);
};