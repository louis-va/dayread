import { Request, Response } from 'express';
import { IUser } from '../models/user.model';
import { calculateLikesAndComments } from '../utils/post.utils';
import database from '../models';
const Post = database.post;
const Follow = database.follow;

async function getFeed(req: Request, res: Response) {
  try {
    const user = req.user as IUser

    // Get the users that the current user is following
    const followingList = await Follow.find({ follower: user.id }).select('following');
    const followingIds = followingList.map((follow) => follow.following);

    // Fetch the 10 most recent posts from followees with pagination
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    const recentPosts = await Post.find({ author: { $in: followingIds, $ne: user.id }, is_comment: false })
      .sort({ created_date: -1 })
      .skip(skip)
      .limit(pageSize)
      .populate('author', 'username')
      .exec();

    // Count number of likes and comments
    const postsDetails = await calculateLikesAndComments(recentPosts)

    return res.status(200).send(postsDetails);
  } catch (err: any) {
    return res.status(500).send({ message: err });
  }
}

async function getDiscoveryFeed(req: Request, res: Response) {
  try {
    const user = req.user as IUser

    // Get the users that the current user is following
    const followingList = await Follow.find({ follower: user.id }).select('following');
    const followingIds = followingList.map((follow) => follow.following);

    // Fetch the 10 most recent posts from non-followees with pagination
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    const recentPosts = await Post.find({ author: { $nin: followingIds, $ne: user.id }, is_comment: false })
      .sort({ created_date: -1 })
      .skip(skip)
      .limit(pageSize)
      .populate('author', 'username')
      .exec();

    // Count number of likes and comments
    const postsDetails = await calculateLikesAndComments(recentPosts)

    return res.status(200).send(postsDetails);
  } catch (err: any) {
    return res.status(500).send({ message: err });
  }
}

export default { getFeed, getDiscoveryFeed }
