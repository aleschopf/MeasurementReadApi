import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export const analyzeImage = async (imageBase64: string): Promise<number> => {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = "Please analyze this image of a utility meter and provide only the numeric reading of the measurement. Return only the number, with no additional text.";

    const result = await model.generateContent([prompt, { inlineData: { data: imageBase64, mimeType: 'image/jpeg' } }]);
    const response = await result.response;
    const text = response.text();

    const numericReading = parseFloat(text);

    if (isNaN(numericReading)) {
        throw new Error('Failed to extract numeric reading from image');
    }

    return numericReading;
};