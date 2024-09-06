import fs from 'fs'
export const getBase64Image = (filePath: string) => {
    const file = fs.readFileSync(filePath);
    return `${file.toString('base64')}`;
};

export function generateRandomMeasurement(customer_code?: string): [string, string, string, number, string] {
    return [
        customer_code ?? (Math.random() * 100000).toString(),
        new Date().toISOString(),
        'WATER',
        0,
        'mocked-img'
    ]
}