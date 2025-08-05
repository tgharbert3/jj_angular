import express, { NextFunction } from 'express';
import { getAllPosts, addPost } from '../controllers/blog.controller';


const blogRouter = express.Router();

//**Router for the blog feature. */

/**Route for adding post */
blogRouter.post('/add', async (req, res, next: NextFunction) => {

    const { postText, fileName } = req.body;
    if (!postText) {
        return res.send(400).json({ error: "Text is required " });
    }
    try {
        //will be removed when auth token is implemented
        const user_id = 1;
        const newPost = addPost(postText, fileName, user_id);
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
})

export default blogRouter;