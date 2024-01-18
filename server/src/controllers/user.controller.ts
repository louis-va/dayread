import { Request, Response } from 'express';
import { IUser } from '../models/user.model';
import { getPaginatedPosts } from '../utils/post.utils';
import database from '../models';
const Follow = database.follow;
const Like = database.like;
const User = database.user;

async function follow(req: Request, res: Response) {
  try {
    const user = req.user as IUser
    const following = await User.findOne({ username: req.params.username })

    const follow = new Follow({
      follower: user.id,
      following: following!.id,
      date: Date.now()
    })
    await follow.save();

    return res.status(200).send({ message: 'User successfully followed.'});
  } catch (err: any) {
    return res.status(500).send({ message: err });
  }
}

async function unfollow(req: Request, res: Response) {
  try {
    const user = req.user as IUser
    const following = await User.findOne({ username: req.params.username })

    const follow = await Follow.findOne({ follower: user.id, following: following!.id })
    await follow!.deleteOne()

    return res.status(200).send({ message: 'User successfully unfollowed.'});
  } catch (err: any) {
    return res.status(500).send({ message: err });
  }
}

async function getPosts(req: Request, res: Response) {
  try {
    const user = req.user as IUser
    
    // Get paginated posts
    const page = parseInt(req.query.page as string) || 1;
    const posts = await getPaginatedPosts({ author: user.id }, page)

    return res.status(200).send(posts);
  } catch (err: any) {
    return res.status(500).send({ message: err });
  }
}

async function getLikedPosts(req: Request, res: Response) {
  try {
    const user = req.user as IUser

    // Get the liked post ids
    const likedPosts = await Like.find({ liked_by: user.id }).select('post');
    const likedPostsIds = likedPosts.map((post) => post.post);
    
    // Get paginated posts
    const page = parseInt(req.query.page as string) || 1;
    const posts = await getPaginatedPosts({ _id: { $in: likedPostsIds } }, page)

    return res.status(200).send(posts);
  } catch (err: any) {
    return res.status(500).send({ message: err });
  }
}

export default { follow, unfollow, getPosts, getLikedPosts }