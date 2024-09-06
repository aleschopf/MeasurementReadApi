import { Connection } from "typeorm/index.js";
import { getMeasurementByUuid, Measurement, saveMeasurement } from "../../src/models/Measurement";
import { connectDatabase } from "../../src/config/database";
import { generateRandomMeasurement } from "../helpers";
import supertest from "supertest";
import app from "../../src/app";
import { randomUUID } from "crypto";

describe('Should test list api endpoints', () => {
    let databaseConnection: Connection;
    let data: Measurement[];
    const CUSTOMER_CODE = randomUUID()
    beforeAll(async () => {
        databaseConnection = await connectDatabase();

        const promises = [] as Promise<Measurement>[];
        Array.from({ length: 64 }, () => generateRandomMeasurement(CUSTOMER_CODE)).forEach(i => {
            promises.push(saveMeasurement(...i));
        });
        
        data = await Promise.all(promises);
    });
    
    test('Data should be defined after beforeAll', () => {
        expect(data).toBeDefined();
    });
     test('Should test the list sucessfully', async () => {
        const response = await supertest(app).get(`/${CUSTOMER_CODE}/list?type=WATER`)
        expect(response.status).toBe(200)
        expect(Array.isArray(response.body.measures)).toBe(true)
        expect(response.body.measures).toHaveProperty('length')
        expect(response.body.measures).toHaveLength(64)
     })
})