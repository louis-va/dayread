import { Request, Response, NextFunction } from 'express';
import { IUser } from '../models/user.model';
import database from '../models';
const Post = database.post;
const Like = database.like;

async function checkValidContent(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.body.content) {
      return res.status(400).send({ 
        message: "Content is empty.",
        error: "content_is_empty"
      });
    }

    if (req.body.content.length > 240) {
      return res.status(400).send({ 
        message: "Content is too long.",
        error: "content_is_too_long"
      });
    }

    next();
  } catch(err: any) {
    return res.status(500).send({ message: err.message || "Some error occurred while validating post" });
  }
}

async function checkExistingPost(req: Request, res: Response, next: NextFunction) {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).send({ 
      message: "Invalid post id",
      error: "invalid_id"
    });

    next();
  } catch(err: any) {
    if (err.name === "CastError") return res.status(404).send({ 
      message: "Invalid post id",
      error: "invalid_id"
    });
    return res.status(500).send({ message: err.message || "Some error occurred while validating post" });
  }
}

async function checkIsPostLiked(req: Request, res: Response, next: NextFunction) {
  try {
    const user = req.user as IUser
    const alreadyLiked = await Like.findOne({ post: req.params.id, liked_by: user!.id })

    if (alreadyLiked) {
      return res.status(400).send({ 
        message: "Post is already liked.",
        error: "post_already_liked"
      });
    }

    next();
  } catch(err: any) {
    return res.status(500).send({ message: err.message || "Some error occurred while checking like" });
  }
}

async function checkIsPostNotLiked(req: Request, res: Response, next: NextFunction) {
  try {
    const user = req.user as IUser
    const alreadyLiked = await Like.findOne({ post: req.params.id, liked_by: user!.id })

    if (!alreadyLiked) {
      return res.status(400).send({ 
        message: "Post is not liked.",
        error: "post_not_liked"
      });
    }

    next();
  } catch(err: any) {
    return res.status(500).send({ message: err.message || "Some error occurred while checking like" });
  }
}

export { checkValidContent, checkExistingPost, checkIsPostLiked, checkIsPostNotLiked };