jest.mock('../../../config');

import { insertNewUser } from "../../../services/register.service";
import { db } from '../../../config';

describe("unit tests for register service", () => {
    const mockDB = db.one as jest.Mock;

    afterEach(() => {
        mockDB.mockRestore();
    })

    it('should return a user', async () => {
        mockDB.mockReturnValueOnce({
            id: 2,
            firstName: 'Register',
            lastName: 'test',
            email: 'test',
            password: 'test',
        });

        const newUser = await insertNewUser('register', 'test', 'test', 'test');

        console.log("Response: ", newUser);

        expect(db.one).toHaveBeenCalledTimes(1);
        expect(newUser.firstName).toBe('Register');
    });

    it('should return an error', async () => {
        mockDB.mockRejectedValueOnce(new Error('unable to add user'));
        await expect(insertNewUser('register', 'test', 'test', 'test')).rejects.toThrow('unable to add user')
        expect(db.one).toHaveBeenCalledTimes(1);
    })
});