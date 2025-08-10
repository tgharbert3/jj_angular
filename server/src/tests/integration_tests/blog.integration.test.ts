import app from "../../app";
import request from "supertest";
import { db } from "../../config";

describe('Integration tests of blog router', () => {

    afterAll(() => {
        db.$pool.end()
    })

    const userId = 1;
    const postText = 'This is the first post';
    const fileName = 'This is the first file';
    const newPost = 'This is the new post';
    const newFile = 'This is the new filename';
    let postId: Number;

    /**Tests the add post endpoint */
    it('Should return the postId of the post added', async () => {
        const response = await request(app)
            .post('/blog/add')
            .send({ postText, fileName });
        expect(response.status).toBe(200);
        postId = response.body.postid
        console.log({ newPostId: postId });
    });

    /**Tests the getAllPosts endpoint */
    it('Should return the posts', async () => {
        const allPosts = await request(app)
            .get(`/blog/getAllPosts/${userId}`);

        expect(allPosts.status).toBe(200);
        expect(allPosts.body.posts).toBeInstanceOf(Array);
    });

    /**Tests the update endpoint */
    it('Should return the updated post', async () => {
        const updatedPost = await request(app)
            .patch(`/blog/update/${userId}/${postId}`)
            .send({ postText: newPost, fileName: newFile });
        expect(updatedPost.status).toBe(200);
        console.log({ updatedPost: updatedPost.body })
        expect(updatedPost.body).toEqual({
            postid: postId,
            userid: 1,
            filename: newFile,
            posttext: newPost,
        });
    });

    /**Tests deleting a post */
    it('Should return the deleted post', async () => {
        const response = await request(app)
            .delete(`/blog/delete/${postId}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            userid: 1,
            postid: postId,
            posttext: newPost,
            filename: newFile,
        });
        console.log({ deletedPost: response.body })
    });
});