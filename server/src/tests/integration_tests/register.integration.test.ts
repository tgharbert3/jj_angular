import { insertNewUser } from "../../services/register.service";
import { db } from "../../config";
import dotenv from 'dotenv';

describe('Integration tests for the register route', () => {

    beforeAll(() => {
        dotenv.config();
    });

    afterAll(async () => {
        await db.$pool.end()
    })

    it('Should return a new user', async () => {
        const response = await insertNewUser('tyler', 'test2', 'test2', 'test2');
        console.log("Response", response);
        expect(response).toBeTruthy();
    })
})

