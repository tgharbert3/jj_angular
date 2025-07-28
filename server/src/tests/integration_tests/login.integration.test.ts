import { fetchUserByEmail } from "../../services/login.service";
import { db } from "../../config";

describe('POST /login', () => {
    afterAll(async () => {
        await db.$pool.end()
    })

    /**
     * Tests only the service function
     */
    it('Should return the user', async () => {
        const response = await fetchUserByEmail('test');
        console.log('Response', response);
        expect(response).toBeTruthy();
    })


});