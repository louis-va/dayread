import { IPost } from "../models/post.model";
import { IUser } from "../models/user.model";
import database from '../models';
const Post = database.post;

/**
 * Takes in an array of posts, calculates the number of likes and comments for each post,
    and returns the posts in a structured array of objects.
 * @param posts An array of post objects.
 * @returns A structured array of post objects with added 'likes' and 'comments' properties.
 */
export async function calculateLikesAndComments(posts: IPost[]) {
  const structuredPosts = await Promise.all(
    posts.map(async (post: any) => {
      const commentsNumber = await Post.countDocuments({ commented_on: post._id });
      const author = post.author as IUser
      // TODO: calculate number of likes

      return {
        id: post._id,
        content: post.content,
        comments: commentsNumber,
        favourites: 0,
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