import { Request, Response, NextFunction } from 'express';
import { IUser } from '../models/user.model';
import database from '../models';
const User = database.user;
const Follow = database.follow;

async function checkExistingUser(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await User.findOne({ username: req.params.username })
    if (!user) {
      return res.status(404).send({ 
        message: "Invalid username.",
        error: "invalid_username"
      });
    }

    next();
  } catch(err: any) {
    if (err.name === "CastError") return res.status(404).send({ 
      message: "Invalid username.",
      error: "invalid_username"
    });
    return res.status(500).send({ message: err.message || "Some error occurred while checking user" });
  }
}

async function checkFollowingUser(req: Request, res: Response, next: NextFunction) {
  try {
    const follower = req.user as IUser
    const following = await User.findOne({ username: req.params.username })

    const alreadyFollow = await Follow.findOne({ follower: follower.id, following: following!.id })

    if (alreadyFollow) {
      return res.status(400).send({ 
        message: "User is already followed.",
        error: "user_already_followed"
      });
    }

    next();
  } catch(err: any) {
    return res.status(500).send({ message: err.message || "Some error occurred while checking follow" });
  }
}

async function checkNotFollowingUser(req: Request, res: Response, next: NextFunction) {
  try {
    const follower = req.user as IUser
    const following = await User.findOne({ username: req.params.username })

    const alreadyFollow = await Follow.findOne({ follower: follower.id, following: following!.id })

    if (!alreadyFollow) {
      return res.status(400).send({ 
        message: "User is not followed.",
        error: "user_not_followed"
      });
    }

    next();
  } catch(err: any) {
    return res.status(500).send({ message: err.message || "Some error occurred while checking follow" });
  }
}

async function checkValidEditProfileParams(req: Request, res: Response, next: NextFunction) {
  try {
    
    if (!req.body.firstname || !req.body.lastname || !req.body.bio) {
      return res.status(400).send({ 
        message: "Missing parameters.",
        error: "missing_parameters"
      });
    }

    next();
  } catch(err: any) {
    return res.status(500).send({ message: err.message || "Some error occurred while checking follow" });
  }
}

export { checkExistingUser, checkFollowingUser, checkNotFollowingUser, checkValidEditProfileParams };