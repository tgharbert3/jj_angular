import express, { NextFunction } from 'express';
import { getAllPosts } from '../controllers/blog.controller';

const blogRouter = express.Router();

//**Router for the blog feature. */

/**Route for adding post */
// blogRouter.post('/add', (req, res, next: NextFunction) => {


// });
/**Route for fetching posts */
blogRouter.get('/getAllPosts', async (req, res, next: NextFunction) => {
    try {
        const posts = await getAllPosts();
        if (!posts) {
            return res.status(404).json({ message: "No posts found" });
        }
        res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
})

export default blogRouter;