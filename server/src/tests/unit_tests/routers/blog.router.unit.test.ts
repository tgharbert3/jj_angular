jest.mock('../../../controllers/blog.controller');

import app from "../../../app";
import request from 'supertest';
import { getAllPosts, addPost } from "../../../controllers/blog.controller";

describe('Unit Test for blog router', () => {
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


})