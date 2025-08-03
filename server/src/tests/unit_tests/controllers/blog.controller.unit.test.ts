jest.mock('../../../services/blog.service')

import { getAllPostsFromDB } from "../../../services/blog.service";
import { getAllPosts } from "../../../controllers/blog.controller";

describe('Unit tests the blog controller', () => {
    const mockGetAllPostsFromDB = getAllPostsFromDB as jest.Mock;

    afterEach(() => {
        jest.clearAllMocks();
    })

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

})