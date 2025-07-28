import { insertNewUser } from "../../services/register.service";

describe('Integration tests for the register route', () => {
    it('Should return a new user', async () => {
        const response = await insertNewUser('tyler', 'test2', 'test2', 'test2');
        console.log("Response", response);
        expect(response).toBeTruthy();
    })
})

