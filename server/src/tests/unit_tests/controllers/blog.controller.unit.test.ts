jest.mock('../../../services/blog.service')

import { getAllPostsFromDB, addPostToDb, updatePostInDb, deletePostFromDb } from "../../../services/blog.service";
import { getAllPosts, addPost, updatePost, deletePost } from "../../../controllers/blog.controller";

describe('Unit tests the blog controller', () => {
    const postText = 'This is the post text';
    const postId = 1;
    const userId = 1;
    const fileName = "This is a filename";

    afterEach(() => {
        jest.clearAllMocks();
    })

    describe('Unit tests for the get all posts', () => {
        const mockGetAllPostsFromDB = getAllPostsFromDB as jest.Mock;


        /**Tests controller under normal operation */
        it('Should return an array of posts', async () => {
            mockGetAllPostsFromDB.mockResolvedValueOnce([
                {
                    postid: 1,
                    userId: 1,
                    fileName: '',
                    postText: 'This is the firstPost',
                }
            ]);
            const posts = await getAllPosts(1);
            expect(posts).toBeInstanceOf(Array);
            if (posts) {
                expect(posts[0]).toMatchObject({
                    postid: 1,
                    userId: 1,
                    fileName: '',
                    postText: 'This is the firstPost',
                });
            };
            expect(mockGetAllPostsFromDB).toHaveBeenCalledTimes(1);
        });

        /**Tests if block for not valid userId */
        it('Should return null', async () => {
            const nan = await getAllPosts(NaN);
            expect(nan).toBe(null);
        });

        /**Tests returning null for empty array */
        it('Should return null', async () => {
            mockGetAllPostsFromDB.mockReturnValue([]);

            const response = await getAllPosts(1);
            expect(response).toBe(null);
            expect(mockGetAllPostsFromDB).toHaveBeenCalledTimes(1);
        });

        /**Tests the catch blcok */
        it('Should throw error', async () => {
            mockGetAllPostsFromDB.mockRejectedValueOnce(new Error('Unable to get posts from db'));

            await expect(getAllPosts(1)).rejects.toThrow('Unable to get posts from db');
            expect(mockGetAllPostsFromDB).toHaveBeenCalledTimes(1);
        });
    });

    describe('Tests the add post function', () => {
        const mockAddPostToDb = addPostToDb as jest.Mock;


        /**Tests under normal function */
        it('Should return the post that was added', async () => {
            mockAddPostToDb.mockResolvedValue({
                postId: 1,
            });

            const response = await addPost(postText, fileName, userId);
            expect(response).toEqual({
                postId: 1,
            });

            expect(mockAddPostToDb).toHaveBeenCalledTimes(1);
        });

        /**Tests the if the query returns empty */
        it('Should return null', async () => {
            mockAddPostToDb.mockResolvedValueOnce(null);

            const response = await addPost(postText, fileName, userId);
            expect(response).toBeNull();
            expect(mockAddPostToDb).toHaveBeenCalledTimes(1);
        });

        /**Tests the catch block */
        it('Should return error', async () => {
            mockAddPostToDb.mockRejectedValueOnce(new Error('Unable to add post'));

            await expect(addPost(postText, fileName, userId)).rejects.toThrow('Unable to add post');
            expect(mockAddPostToDb).toHaveBeenCalledTimes(1);
        });

        /**Tests the invlaid userId */
        it('Should return null', async () => {
            const response = await addPost(postText, fileName, -1);
            expect(response).toBeNull();
        });
    });

    describe('Tests the update post function', () => {
        const mockUpdatePostInDb = updatePostInDb as jest.Mock;

        /**Tests under normal operateion */
        it('Should return an object', async () => {
            mockUpdatePostInDb.mockResolvedValueOnce({
                userId,
                postId,
                postText,
                fileName,
            });

            const response = await updatePost(userId, postId, postText, fileName);
            expect(response).toEqual({
                userId,
                postId,
                postText,
                fileName
            });
            expect(mockUpdatePostInDb).toHaveBeenCalledTimes(1);
        });

        /**Tests the invalid userId and postId */
        it('Should return null', async () => {
            const invalidUser = await updatePost(-1, postId, postText, fileName);
            const invalidPost = await updatePost(userId, Infinity, postText, fileName);

            expect(invalidUser).toBeNull();
            expect(invalidPost).toBeNull();
        });

        /**Tests the empty return from the db */
        it('Should return null', async () => {
            mockUpdatePostInDb.mockResolvedValueOnce(null);

            const response = await updatePost(userId, postId, postText, fileName);

            expect(response).toBeNull();
            expect(mockUpdatePostInDb).toHaveBeenCalledTimes(1);
        });

        /**Tests the catch block */
        it('Should return an error', async () => {
            mockUpdatePostInDb.mockRejectedValueOnce(new Error('Unable to update post'));

            await expect(updatePost(userId, postId, postText, fileName)).rejects.toThrow('Unable to update post');
            expect(mockUpdatePostInDb).toHaveBeenCalledTimes(1);
        });

    })
})