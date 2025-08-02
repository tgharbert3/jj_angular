jest.mock('../../../controllers/blog.controller');

import app from "../../../app";
import request from 'supertest';
import { getAllPosts } from "../../../controllers/blog.controller";

describe('Unit Test for blog router', () => {

    const mockGetAllPosts = getAllPosts as jest.Mock;

    afterEach(() => {
        jest.clearAllMocks();
    });

    /**Tests router under normal function */
    it('Should return array of object posts', async () => {
        mockGetAllPosts.mockReturnValueOnce([
            {
                userId: 1,
                postId: 1,
                post: 'This is the first post',
            }
        ]);

        const response = await request(app).get('/blog/getAllPosts');
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

        const response = await request(app).get('/blog/getAllPosts');
        expect(response.status).toEqual(404);
        expect(response.body.message).toMatch("No posts found");
        expect(mockGetAllPosts).toHaveBeenCalledTimes(1);
    });

    /**Tests the catch block */
    it('Should return 500', async () => {
        mockGetAllPosts.mockRejectedValueOnce(new Error('Could not get all posts'));

        const response = await request(app).get('/blog/getAllPosts');
        expect(response.status).toEqual(500);
        expect(response.body.message).toMatch('Could not get all posts');
        expect(mockGetAllPosts).toHaveBeenCalledTimes(1);
    });
})