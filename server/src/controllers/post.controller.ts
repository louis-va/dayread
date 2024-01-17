import { Request, Response } from 'express';
import { IUser } from '../models/user.model';
import { calculateLikesAndComments } from '../utils/post.utils';
import database from '../models';
const Post = database.post;

async function addPost(req: Request, res: Response) {
  try {
    const author = req.user as IUser

    const post = new Post({
      content: req.body.content,
      is_comment: !!req.body.commented_on,
      commented_on: req.body.commented_on || null,
      author: author._id,
      created_date: Date.now()
    })

    await post.save();

    return res.status(200).send({ id: post._id });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
}

async function getPost(req: Request, res: Response) {
  try {
    const post = await Post.findById(req.params.id).populate('author');

    if (!post) return res.status(404).send({ 
      message: "Invalid id",
      error: "invalid_id"
    });

    const postDetails = await calculateLikesAndComments([post])

    return res.status(200).send(postDetails[0]);
    
  } catch (err: any) {
    if (err.name === "CastError") return res.status(404).send({ 
      message: "Invalid id",
      error: "invalid_id"
    });
    return res.status(500).send({ message: err });
  }
}

async function getComments(req: Request, res: Response) {
  try {
    const posts = await Post.find({ commented_on: req.params.id }).populate('author');

    if (!posts) return res.status(404).send({
      message: "Invalid id",
      error: "invalid_id"
    });

    const postsDetails = await calculateLikesAndComments(posts)

    return res.status(200).send(postsDetails);

  } catch (err: any) {
    if (err.name === "CastError") return res.status(404).send({ 
      message: "Invalid id",
      error: "invalid_id"
    });
    return res.status(500).send({ message: err });
  }
}

export default { addPost, getPost, getComments }