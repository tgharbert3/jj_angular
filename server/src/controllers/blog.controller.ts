import { getAllPostsFromDB } from "../services/blog.service";
import { validateNumber } from "../middleware/shared";

/**
 * controller function to fetch all the posts
 * @param userID user to receive the post from
 * @returns null if no posts for that user or an array of posts
 * Author: tgh
 */
export async function getAllPosts(userID: number) {
    if (!validateNumber(userID)) {
        console.info("Not a valid Image id");
        return null;
    }

    try {
        const posts = await getAllPostsFromDB(userID);
        if (posts.length === 0) {
            return null;
        };
        return posts;
    } catch (error) {
        console.error(error);
        throw Error(`Error from blog Controller ${error}`);
    }

}