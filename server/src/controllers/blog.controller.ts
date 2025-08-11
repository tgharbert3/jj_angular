import { getAllPostsFromDB, addPostToDb, updatePostInDb, deletePostFromDb } from "../services/blog.service";
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
export async function addPost(postText: string, fileName: string, userID: number, postTitle: string, postDate: string) {
    if (!validateNumber(userID)) {
        console.info("Not a valid Image id");
        return null;
    }
    try {
        const newPost = await addPostToDb(postText, fileName, userID, postTitle, postDate);
        if (!newPost) {
            return null;
        }
        return newPost;
    } catch (error) {
        console.error("Unable to add post");
        throw Error(`Error adding post from controller: ${error}`);
    }
}

/**
 * Function to update the post content
 * @param userId User 
 * @param postID which post to update
 * @param postText new postText
 * @param fileName new fileName
 * @returns the new post
 */
export async function updatePost(userId: number, postID: number, postText: string, fileName: string, postTitle: string, postDate: string) {
    if (!validateNumber(userId) || (!validateNumber(postID))) {
        console.info("Not a valid Image id");
        return null;
    };

    try {
        const newPost = await updatePostInDb(userId, postID, postText, fileName, postTitle, postDate);
        if (!newPost) {
            return null;
        }
        return newPost;
    } catch (error) {
        console.error('Unable to update post');
        throw Error(`Error updating post from controller: ${error}`);
    }
};

/**
 * Controller function for deleted a post
 * @param postId the post to delete
 * @returns the information of the post that needs to be deleted
 */
export async function deletePost(postId: number) {
    if (!validateNumber(postId)) {
        console.info("Not a valid post id");
        return null;
    }
    try {
        const deletedPost = await deletePostFromDb(postId);
        if (!deletedPost) {
            return null;
        };
        return deletedPost;
    } catch (error) {
        console.error(error);
        throw Error(`Error: ${(error as Error).message}`)
    }
};