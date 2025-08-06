import express, { NextFunction } from 'express';
import { getAllPosts, addPost, updatePost, deletePost } from '../controllers/blog.controller';


const blogRouter = express.Router();

//**Router for the blog feature. */

/**Route for adding post */
blogRouter.post('/add', async (req, res, next: NextFunction) => {

    const { postText, fileName } = req.body;
    if (!postText) {
        return res.status(400).json({ error: "Text is required " });
    }
    try {
        //will be removed when auth token is implemented
        const user_id = 1;
        //when testing, make sure that it has to return a valid object
        const newPost = await addPost(postText, fileName, user_id);
        res.status(200).json(newPost);
    } catch (error) {
        next(error);
    }

});


/**Route for fetching posts */
blogRouter.get('/getAllPosts/:userID', async (req, res, next: NextFunction) => {
    const param = req.params.userID
    const user_id = parseInt(param, 10)
    if (isNaN(user_id)) {
        return res.status(404).json({ error: "Invalid user ID" });
    }
    try {
        const posts = await getAllPosts(user_id);
        if (!posts) {
            return res.status(404).json({ message: "No posts found" });
        }
        res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
});

/**Route for updating a post */
blogRouter.patch('/update/:userId/:postId', async (req, res, next: NextFunction) => {

    const userParam = req.params.userId
    const postParam = req.params.postId;
    const { postText, fileName } = req.body;

    const userId = parseInt(userParam, 10);
    const postId = parseInt(postParam, 10);

    try {
        const newPost = await updatePost(userId, postId, postText, fileName);
        if (!newPost) {
            return res.status(404).json({ error: "Unable to update post: No post found" })
        }
        res.status(200).json(newPost);
    } catch (error) {
        next(error);
    };
});

/**Route for deleting post */
blogRouter.delete('/delete/:postId', async (req, res, next: NextFunction) => {

    const postId = parseInt(req.params.postId, 10);
    try {
        const deletedPost = await deletePost(postId);
        if (!deletedPost) {
            return res.status(404).json({ error: "Unable to delete post: No post found" });
        };
        res.status(200).json({ post: deletedPost });
    } catch (error) {
        next(error);
    };
});

export default blogRouter;