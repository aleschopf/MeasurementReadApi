import fs from 'fs'
export const getBase64Image = (filePath: string) => {
    const file = fs.readFileSync(filePath);
    return `${file.toString('base64')}`;
};