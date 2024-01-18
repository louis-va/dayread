import { FilterQuery } from "mongoose";
import { IPost } from "../models/post.model";
import { IUser } from "../models/user.model";
import database from '../models';
const Post = database.post;
const Like = database.like;

/**
 * Takes in an array of posts, calculates the number of likes and comments for each post,
 *  and returns the posts in a structured array of objects.
 * @param posts An array of post objects.
 * @returns A structured array of post objects with added 'likes' and 'comments' properties.
 */
export async function calculateLikesAndComments(posts: IPost[], user: IUser) {
  const structuredPosts = await Promise.all(
    posts.map(async (post: any) => {
      const author = post.author as IUser

      const [commentsNumber, favouritesNumber, isPostLiked] = await Promise.all([
        await Post.countDocuments({ commented_on: post._id }),
        await Like.countDocuments({ post: post._id }),
        await Like.findOne({ post: post._id, liked_by: user!.id })
      ]);

      return {
        id: post._id,
        content: post.content,
        comments: commentsNumber,
        favourites: favouritesNumber,
        is_liked: !!isPostLiked,
        author: {
          id: author?._id,
          username: author?.username
        },
        is_comment: post.is_comment,
        commented_on: post.commented_on,
        created_date: post.created_date
      };
    })
  );

  return structuredPosts;
}

/**
 * Fetch the posts that match the query. The results are paginated by page of 10 posts.
 * @param filter Mongoose query filter
 * @param page 
 * @returns A structured array of 10 post objects
 */
export async function getPaginatedPosts(filter: FilterQuery<IPost>, page: number, user: IUser) {
  // Fetch the 10 most recent posts from followees with pagination
  const pageSize = 10;
  const skip = (page - 1) * pageSize;

  const paginatedPosts = await Post.find(filter)
    .sort({ created_date: -1 })
    .skip(skip)
    .limit(pageSize)
    .populate('author', 'username')
    .exec();

  // Count number of likes and comments
  const postsDetailed = await calculateLikesAndComments(paginatedPosts, user)

  return postsDetailed;
}