import app from '../../src/app'
import request from 'supertest'
import { getBase64Image } from '../helpers'
import { connectDatabase } from '../../src/config/database'
describe('Should test upload api endpoints', () => {
    beforeAll(connectDatabase)
    test('Upload route 01', async () => {
        const response = await request(app).post('/upload/').send({ 
            customer_code: Math.random() * 10000,
            measure_type: "WATER",
            measure_datetime: new Date().toISOString(),
            image: getBase64Image(process.cwd()+'/examples/01.png')
         })
        expect(response.body).toHaveProperty("measure_value")
        expect(response.body).toHaveProperty("measure_uuid")
    })
    test('Upload route 02', async () => {
        const response = await request(app).post('/upload/').send({ 
            customer_code: Math.random() * 10000,
            measure_type: "WATER",
            measure_datetime: new Date().toISOString(),
            image: getBase64Image(process.cwd()+'/examples/02.jpeg')
         })
        expect(response.body).toHaveProperty("measure_value")
        expect(response.body).toHaveProperty("measure_uuid")
    })
    test('Upload route 03', async () => {
        const response = await request(app).post('/upload/').send({ 
            customer_code: Math.random() * 10000,
            measure_type: "WATER",
            measure_datetime: new Date().toISOString(),
            image: getBase64Image(process.cwd()+'/examples/03.jpeg')
         })
        expect(response.body).toHaveProperty("measure_value")
        expect(response.body).toHaveProperty("measure_uuid")
    })
    test('Upload route 04', async () => {
        const response = await request(app).post('/upload/').send({ 
            customer_code: Math.random() * 10000,
            measure_type: "WATER",
            measure_datetime: new Date().toISOString(),
            image: getBase64Image(process.cwd()+'/examples/04.jpeg')
         })
        expect(response.body).toHaveProperty("measure_value")
        expect(response.body).toHaveProperty("measure_uuid")
    })
    test('Upload route 05', async () => {
        const response = await request(app).post('/upload/').send({ 
            customer_code: Math.random() * 10000,
            measure_type: "WATER",
            measure_datetime: new Date().toISOString(),
            image: getBase64Image(process.cwd()+'/examples/05.jpeg')
         })
        expect(response.body).toHaveProperty("measure_value")
        expect(response.body).toHaveProperty("measure_uuid")
    })
    test('Upload route 06', async () => {
        const response = await request(app).post('/upload/').send({ 
            customer_code: Math.random() * 10000,
            measure_type: "WATER",
            measure_datetime: new Date().toISOString(),
            image: getBase64Image(process.cwd()+'/examples/06.jpeg')
         })
        expect(response.body).toHaveProperty("measure_value")
        expect(response.body).toHaveProperty("measure_uuid")
    })
})