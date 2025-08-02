import express, { NextFunction } from 'express';
import { getAllPosts } from '../controllers/blog.controller';

const blogRouter = express.Router();

//**Router for the blog feature. */

/**Route for adding post */
// blogRouter.post('/add', (req, res, next: NextFunction) => {


// });
/**Route for fetching posts */
blogRouter.get('/getAllPosts/:userID', async (req, res, next: NextFunction) => {
    const param = req.params.userID
    const user_id = parseInt(param, 10)
    if (isNaN(user_id)) {
        return res.status(400).json({ error: "Invalid user ID" });
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