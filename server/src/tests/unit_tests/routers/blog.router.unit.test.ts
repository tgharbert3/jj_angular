jest.mock('../../../controllers/blog.controller');

import app from "../../../app";
import request from 'supertest';
import { getAllPosts, addPost, updatePost, deletePost } from "../../../controllers/blog.controller";
import { response } from "express";


describe('Unit Test for blog router', () => {

    const userId = 1;
    const postId = 1;
    const postText = 'This is the first post';
    const fileName = 'This is the first file'

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('/GET all posts', () => {
        const mockGetAllPosts = getAllPosts as jest.Mock;

        /**Tests router under normal function */
        it('Should return array of object posts', async () => {
            mockGetAllPosts.mockReturnValueOnce([
                {
                    userId: 1,
                    postId: 1,
                    post: 'This is the first post',
                }
            ]);

            const response = await request(app).get('/blog/getAllPosts/1');
            expect(response.status).toEqual(200);
            expect(response.body).toMatchObject([
                {
                    userId: 1,
                    postId: 1,
                    post: 'This is the first post',
                }]);
            expect(mockGetAllPosts).toHaveBeenCalledTimes(1);

        })

        /**Tests if the db returns no posts */
        it('Should return 404 and message', async () => {
            mockGetAllPosts.mockReturnValueOnce(null);

            const response = await request(app).get('/blog/getAllPosts/1');
            expect(response.status).toEqual(404);
            expect(response.body.message).toMatch("No posts found");
            expect(mockGetAllPosts).toHaveBeenCalledTimes(1);
        });

        /**Tests the catch block */
        it('Should return 500', async () => {
            mockGetAllPosts.mockRejectedValueOnce(new Error('Could not get all posts'));

            const response = await request(app).get('/blog/getAllPosts/1');
            expect(response.status).toEqual(500);
            expect(response.body.message).toMatch('Could not get all posts');
            expect(mockGetAllPosts).toHaveBeenCalledTimes(1);
        });

        it("Should return 404", async () => {

            const response = await request(app).get('/blog/getAllPosts/t');
            expect(response.status).toEqual(404);
            expect(response.body.error).toMatch("Invalid user ID");
        });
    });

    describe('/POST add post', () => {
        const mockAddPost = addPost as jest.Mock;

        /**Tests under normal function */
        it('Should return 200', async () => {
            mockAddPost.mockReturnValueOnce({
                postId: 1,
            });

            const response = await request(app)
                .post('/blog/add')
                .send({
                    postText: 'This is the first post',
                    fileName: 'This is the first file',
                });
            expect(response.status).toBe(200);
            expect(response.body.postId).toEqual(1);
            expect(mockAddPost).toHaveBeenCalledTimes(1);
        });

        /**Tests it to make sure there is post text */
        it('Should return 400', async () => {
            const response = await request(app)
                .post('/blog/add')
                .send({ fileName: 'This is the first file' });
            expect(response.status).toBe(400);
            expect(response.body.error).toEqual('Text is required');
        });


        /**Tests if the db returns null */
        it('Should return 500', async () => {
            mockAddPost.mockReturnValueOnce(null);

            const response = await request(app)
                .post('/blog/add')
                .send({
                    postText: 'This is the first post',
                    fileName: 'This is the first file',
                });
            expect(response.status).toBe(500);
            expect(response.body.error).toEqual("Unable to add post");
            expect(mockAddPost).toHaveBeenCalledTimes(1);
        });

        /**Tests the catch block */
        it('Should return an error', async () => {
            mockAddPost.mockRejectedValueOnce(new Error('Unable to add post'));

            const response = await request(app)
                .post('/blog/add')
                .send({
                    postText: 'This is the first post',
                    fileName: 'This is the first file',
                });
            expect(response.status).toBe(500);
            expect(response.body.message).toMatch('Unable to add post');
            expect(mockAddPost).toHaveBeenCalledTimes(1);
        });
    });

    describe('/Patch update function', () => {
        const mockUpdatePost = updatePost as jest.Mock;

        /**Tests under normal operation */
        it('Should return 200', async () => {
            mockUpdatePost.mockResolvedValueOnce({
                userId,
                postId,
                postText,
                fileName,
            });

            const response = await request(app).patch(`/blog/update/${userId}/${postId}`)
                .send({
                    postText,
                    fileName,
                });

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                userId,
                postId,
                postText,
                fileName,
            });
            expect(mockUpdatePost).toHaveBeenCalledTimes(1);
        });

        /**Tests postText is required*/
        it('Should return 400', async () => {
            const response = await request(app)
                .patch(`/blog/update/${userId}/${postId}`)
                .send({ fileName });
            expect(response.status).toBe(400);
            expect(response.body.error).toEqual('Text is required')
        });

        /**Tests if valid user and post params */
        it('Should return 400', async () => {
            const invalidUser = await request(app)
                .patch(`/blog/update/t/${postId}`)
                .send({ postText, fileName });

            const invalidPost = await request(app)
                .patch(`/blog/update/${userId}/g`)
                .send({ postText, fileName });

            expect(invalidUser.status).toBe(400);
            expect(invalidPost.status).toBe(400);
            expect(invalidUser.body.error).toEqual('Need a valid number for user and post id');
        });

        /**Tests if db returns null */
        it('Should return 404', async () => {
            mockUpdatePost.mockResolvedValueOnce(null);

            const response = await request(app)
                .patch(`/blog/update/${userId}/${postId}`)
                .send({ postText, fileName, });

            expect(response.status).toBe(404);
            expect(response.body.error).toEqual("Unable to update post: No post found");
            expect(mockUpdatePost).toHaveBeenCalledTimes(1);
        })

        /**Tests the catch block */
        it('Should return 500', async () => {
            mockUpdatePost.mockRejectedValueOnce(new Error('Unable to update post'));

            const response = await request(app)
                .patch(`/blog/update/${userId}/${postId}`)
                .send({ postText, fileName });
            expect(response.status).toBe(500);
            expect(response.body.message).toEqual('Unable to update post');
            expect(mockUpdatePost).toHaveBeenCalledTimes(1);
        })
    });

    describe('/DELETE delete function', () => {
        const mockDeletePost = deletePost as jest.Mock;

        /**Tests under normal operation */
        it('Should return 200', async () => {
            mockDeletePost.mockResolvedValueOnce({
                userId,
                postId,
                postText,
                fileName
            });

            const response = await request(app).delete(`/blog/delete/${postId}`);
            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                userId,
                postId,
                postText,
                fileName,
            });
            expect(mockDeletePost).toHaveBeenCalledTimes(1);

        });

        /**Tests valid postId if block */
        it('Should return 400', async () => {
            const response = await request(app).delete('/blog/delete/NaN');
            expect(response.status).toBe(400);
            expect(response.body.error).toMatch('Valid postId is required');
        });

        /**Tests if the db returns null */
        it('Should return 400', async () => {
            mockDeletePost.mockResolvedValueOnce(null)
            const response = await request(app).delete(`/blog/delete/${postId}`);
            expect(response.status).toBe(400);
            expect(response.body.error).toMatch("Unable to delete post: No post found");
            expect(mockDeletePost).toHaveBeenCalledTimes(1);
        });

        /**Tests the catch block */
        it('Should return 500', async () => {
            mockDeletePost.mockRejectedValueOnce(new Error('Unable to delete post'));
            const response = await request(app).delete(`/blog/delete/${postId}`);
            expect(response.status).toBe(500);
            expect(response.body.message).toBe('Unable to delete post');
            expect(mockDeletePost).toHaveBeenCalledTimes(1);
        });
    });
})