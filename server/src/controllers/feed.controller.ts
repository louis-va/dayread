import { Request, Response } from 'express';
import { IUser } from '../models/user.model';
import { getPaginatedPosts } from '../utils/post.utils';
import database from '../models';
const Follow = database.follow;

async function getFeed(req: Request, res: Response) {
  try {
    const user = req.user as IUser

    // Get the users that the current user is following
    const followingList = await Follow.find({ follower: user.id }).select('following');
    const followingIds = followingList.map((follow) => follow.following);

    // Get paginated posts
    const page = parseInt(req.query.page as string) || 1;
    const posts = await getPaginatedPosts({ author: { $in: followingIds, $ne: user.id }, is_comment: false }, page)

    return res.status(200).send(posts);
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

    // Get paginated posts
    const page = parseInt(req.query.page as string) || 1;
    const posts = await getPaginatedPosts({ author: { $nin: followingIds, $ne: user.id }, is_comment: false }, page)

    return res.status(200).send(posts);
  } catch (err: any) {
    return res.status(500).send({ message: err });
  }
}

export default { getFeed, getDiscoveryFeed }
