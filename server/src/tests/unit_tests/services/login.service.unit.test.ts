jest.mock('../../../config')

import dotenv from 'dotenv';
import { db } from '../../../config'
import { fetchUserByEmail } from '../../../services/login.service';


describe('unit tests for the login service', () => {
    const mockDB = db.one as jest.Mock;

    beforeAll(() => {
        dotenv.config();
    });

    afterEach(() => {
        mockDB.mockRestore();
    })

    it('should return a user', async () => {
        mockDB.mockResolvedValueOnce({
            id: 1,
            firstName: 'tyler',
            lastName: 'test',
            email: 'test',
            password: 'test',
        });

        const user = await fetchUserByEmail("test");
        console.log(user);

        expect(user.email).toBe('test');
        expect(user.firstName).toBe('tyler');
        expect(db.one).toHaveBeenCalledTimes(1);
    });

    it('Should return an error', async () => {
        mockDB.mockRejectedValueOnce(new Error("User not found"));
        await expect(fetchUserByEmail("Test")).rejects.toThrow('User not found')
        expect(db.one).toHaveBeenCalledTimes(1);
    })
});