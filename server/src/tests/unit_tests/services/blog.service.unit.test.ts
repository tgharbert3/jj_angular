jest.mock('../../../config');

import { db } from "../../../config";
import dotenv from 'dotenv';
import { getAllPostsFromDB, addPostToDb, updatePostInDb, deletePostFromDb } from "../../../services/blog.service";
import { mock } from "node:test";


describe('Unit tests for blog service', () => {
    const mockDB = db.manyOrNone as jest.Mock;

    beforeAll(() => {
        dotenv.config();
    });

    afterEach(() => {
        jest.resetAllMocks();
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
    const mockDB = db.oneOrNone as jest.Mock;

    afterEach(() => {
        jest.resetAllMocks()
    })

    /**Tests under the normal operation */
    it('Should return the postId that was added', async () => {
        mockDB.mockResolvedValueOnce({
            postId: 1,
        }
        );

        const userId = 1;
        const fileName = 'This is the first file';
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
    it('Should throw an error', async () => {
        mockDB.mockRejectedValueOnce(new Error("Unable to add post"));

        const userId = 1;
        const fileName = 'This is the first file';
        const postText = 'This is the first post';
        await expect(addPostToDb(postText, fileName, userId)).rejects.toThrow("Unable to add post");

        expect(mockDB).toHaveBeenCalledTimes(1);
    })
});

describe('Tests the update', () => {
    const mockDB = db.oneOrNone as jest.Mock;

    afterEach(() => {
        jest.resetAllMocks();
    })

    const userId = 1;
    const postId = 1;
    const fileName = 'This is the first file';
    const postText = 'This is the first post';

    /**Tests under normal operation */
    it('Sould return an object', async () => {
        mockDB.mockResolvedValueOnce({
            userId: 1,
            postId: 1,
            postText: 'this is the first post',
            fileName: 'fileName'
        });


        const response = await updatePostInDb(userId, postId, postText, fileName);
        expect(response).toEqual({
            userId: 1,
            postId: 1,
            postText: 'this is the first post',
            fileName: 'fileName'
        });

        expect(mockDB).toHaveBeenCalledTimes(1);
    }),

        /**Tests the catch block */
        it('Should return an error', async () => {
            mockDB.mockRejectedValueOnce(new Error('Unable to update post'));

            await expect(updatePostInDb(userId, postId, postText, fileName)).rejects.toThrow('Unable to update post');
            expect(mockDB).toHaveBeenCalledTimes(1);
        })
});

describe('Tests the delete function', () => {
    const mockDB = db.oneOrNone as jest.Mock;
    const postId = 1;

    afterEach(() => {
        jest.resetAllMocks();
    })

    /**Tests under normal operation */
    it('Should return and object', async () => {
        mockDB.mockResolvedValueOnce({
            userId: 1,
            postId: 1,
            postText: 'this is the first post',
            fileName: 'fileName'
        });

        const response = await deletePostFromDb(postId);

        expect(response).toEqual({
            userId: 1,
            postId: 1,
            postText: 'this is the first post',
            fileName: 'fileName'
        });

        expect(mockDB).toHaveBeenCalledTimes(1);
    });

    /**Tests the catch block */
    it('Should return an error', async () => {
        mockDB.mockRejectedValueOnce(new Error('Unable to delete post'));

        await expect(deletePostFromDb(1)).rejects.toThrow('Unable to delete post');
        expect(mockDB).toHaveBeenCalledTimes(1);
    });
})


