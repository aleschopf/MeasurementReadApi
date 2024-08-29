import { getMeasurements } from '../models/Measurement';

export const listService = async (customerCode: string, measureType?: string) => {
    if (!customerCode) {
        throw new Error('Customer code is required');
    }

    if (measureType && !['WATER', 'GAS'].includes(measureType.toUpperCase())) {
        throw new Error('Invalid measure type');
    }

    const measurements = await getMeasurements(customerCode, measureType);

    if (measurements.length === 0) {
        throw new Error('No measurements found');
    }

    return {
        customer_code: customerCode,
        measures: measurements.map(m => ({
            measure_uuid: m.id,
            measure_datetime: m.measureDatetime,
            measure_type: m.measureType,
            has_confirmed: m.confirmed,
            image_url: m.imageUrl
        }))
    };
};