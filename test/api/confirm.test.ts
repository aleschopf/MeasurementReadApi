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

        data = await Promise.all(promises);  // Aqui você popula `data` corretamente.
    });

    test('Data should be defined after beforeAll', () => {
        expect(data).toBeDefined();  // Esse teste garante que os dados foram carregados.
    });

    it.each([0, 1, 2, 3, 4])('Confirm include testing for index %i', async (index) => {
        // Esse teste será executado para cada índice no array (de 0 a 4).
        expect(data[index]).toBeTruthy();  // Verifique se a medição existe no índice.
    });

    afterAll(() => {
        // console.log('AfterAll disparado!')
        databaseConnection.close(); 
    })
});