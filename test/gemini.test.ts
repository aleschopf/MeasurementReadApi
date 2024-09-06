import { analyzeImage } from '../src/services/geminiService'
import fs from 'fs'
import path from 'path'
import { getBase64Image } from './helpers'
const imagePaths = [
    process.cwd()+'/examples/01.png',
    process.cwd()+'/examples/02.jpeg',
    process.cwd()+'/examples/03.jpeg',
    process.cwd()+'/examples/04.jpeg',
    process.cwd()+'/examples/05.jpeg',
    process.cwd()+'/examples/06.jpeg',
]
const imageValues = [
    62,
    283,
    221,
    999893,
    0,
    163,
]

console.log(process.version)
const images = imagePaths.map(getBase64Image)
describe('Should test gemini', () => {
    images.forEach((base64, index) => {
        test(`Should analyze the image ${index+1} suceffuly`, async () => {
            const result = await analyzeImage(base64)
            expect(typeof result).toBe('number')
        })
    })
    images.forEach((base64, index) => {
        xtest(`Should response with the correct number of the image ${index + 1}`, async () => {
            const result = await analyzeImage(base64)
            console.log({ result })            
            expect(result).toBe(imageValues[index])
        })
    })
})