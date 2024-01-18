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
    const posts = await getPaginatedPosts({ author: user.id }, page, user)

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
    const posts = await getPaginatedPosts({ _id: { $in: likedPostsIds } }, page, user)

    return res.status(200).send(posts);
  } catch (err: any) {
    return res.status(500).send({ message: err });
  }
}

async function getUserInformation(req: Request, res: Response) {
  const user = req.user as IUser
  const userLookup = await User.findOne({ username: req.params.username })

  const isSelf = user.username == userLookup?.username
  const [followerNumber, followingNumber, isFollowing] = await Promise.all([
    await Follow.countDocuments({ following: userLookup?._id }),
    await Follow.countDocuments({ follower: userLookup?._id }),
    await Follow.findOne({ follower: user._id, following: userLookup?.id })
  ]);

  return res.status(200).send({
    username: userLookup?.username,
    firstname: userLookup?.firstname,
    lastname: userLookup?.lastname,
    bio: userLookup?.bio,
    followers: followerNumber,
    following: followingNumber,
    is_following: !!isFollowing,
    is_self: isSelf
  });
}

export default { follow, unfollow, getPosts, getLikedPosts, getUserInformation }