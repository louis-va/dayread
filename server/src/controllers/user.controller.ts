import { Request, Response } from 'express';
import { IUser } from '../models/user.model';
import database from '../models';
const Follow = database.follow;
const User = database.user;

async function follow(req: Request, res: Response) {
  try {
    const follower = req.user as IUser
    const following = await User.findOne({ username: req.params.username })

    const follow = new Follow({
      follower: follower.id,
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
    const follower = req.user as IUser
    const following = await User.findOne({ username: req.params.username })

    const follow = await Follow.findOne({ follower: follower.id, following: following!.id })
    await follow!.deleteOne()

    return res.status(200).send({ message: 'User successfully unfollowed.'});

  } catch (err: any) {
    return res.status(500).send({ message: err });
  }
}

export default { follow, unfollow }