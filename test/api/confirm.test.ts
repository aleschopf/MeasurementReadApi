import app from "../../src/app"
import { connectDatabase } from "../../src/config/database"
import request from 'supertest'
import { generateRandomMeasurement, getBase64Image } from "../helpers"
import { createConnection, Connection } from 'typeorm/index.js';
import { Measurement, saveMeasurement } from "../../src/models/Measurement";
describe('Should test upload api endpoints', () => {
    let databaseConnection: Connection;
    let data: Measurement[];

    beforeAll(async () => {
        databaseConnection = await connectDatabase();

        const promises = [] as Promise<Measurement>[];
        Array.from({ length: 5 }, generateRandomMeasurement).forEach(i => {
            promises.push(saveMeasurement(...i));
        });

        data = await Promise.all(promises);
    });

    test('Data should be defined after beforeAll', () => {
        expect(data).toBeDefined();
    });

    it.each([0, 1, 2, 3, 4])('Confirm include testing for index %i', async (index) => {
        expect(data[index]).toBeTruthy();
    });

    test('Should patch the confirm endpoint sucessfully', async () => {
        const response = await request(app).patch('/confirm').send({
            "measure_uuid": data[Math.floor(Math.random() * data.length)].id,
            "confirmed_value": Math.floor(Math.random() * 5)
        })
        expect(response.statusCode).toBe(200);
    })

    afterAll(() => {
        databaseConnection.close(); 
    })
});