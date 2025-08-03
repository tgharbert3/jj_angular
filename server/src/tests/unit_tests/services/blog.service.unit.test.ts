jest.mock('../../../config');

import { db } from "../../../config";
import dotenv from 'dotenv';
import { getAllPostsFromDB } from "../../../services/blog.service";


describe('Unit tests for blog service', () => {
    const mockDB = db.manyOrNone as jest.Mock;

    beforeAll(() => {
        dotenv.config();
    });

    afterEach(() => {
        jest.clearAllMocks();
    })

    /**Tests under normal operation */
    it('Should return a value', async () => {
        mockDB.mockResolvedValueOnce([{
            postId: 1,
            userId: 1,
            fileName: "text",
            postText: "This is ny first post",
        }]);

        const response = await getAllPostsFromDB(1);
        expect(response).toMatchObject([{
            postId: 1,
            userId: 1,
            fileName: "text",
            postText: "This is ny first post",
        }]);
        expect(mockDB).toHaveBeenCalledTimes(1);
    });

    /**Tests catch block */
    it('Should throw an error', async () => {
        mockDB.mockRejectedValueOnce(new Error("Unable to fetch posts"));

        await expect(getAllPostsFromDB(1)).rejects.toThrow("Unable to fetch posts");
        expect(mockDB).toHaveBeenCalledTimes(1);
    });

})

