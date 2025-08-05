import { getAllPostsFromDB, addPostToDb } from "../services/blog.service";
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

};

/**
 * Controller for adding post to the db
 * @param postText The text of the blog post
 * @param fileName Optional picture upload
 * @returns the new post after it was added to the db
 */
export async function addPost(postText: string, fileName: string, userID: number) {
    try {
        const newPost = await addPostToDb(postText, fileName, userID);
        return newPost;
    } catch (error) {
        console.error("Unaable to add post");
        throw Error(`Error adding post from controller: ${error}`);
    }
}