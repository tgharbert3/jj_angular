jest.mock('../../../config');

import { db } from "../../../config";
import dotenv from 'dotenv';
import { getAllPostsFromDB, addPostToDb } from "../../../services/blog.service";
import { mock } from "node:test";


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

});

describe('Tests the add serive', () => {
    const mockDB = db.one as jest.Mock;

    afterEach(() => {
        jest.clearAllMocks;
    })

    /**Tests under the normal operation */
    it('Should return the object that was added', async () => {
        mockDB.mockResolvedValueOnce({
            postId: 1,
        }
        );

        const userId = 1;
        const fileName = '';
        const postText = 'This is the first post';
        const newPost = await addPostToDb(postText, fileName, userId);
        expect(newPost).toMatchObject(
            {
                postId: 1,
            }
        );
        expect(mockDB).toHaveBeenCalledTimes(1);
    });

    /**Tests the catch block */
    it.skip('Should throw an error', () => { })
});

