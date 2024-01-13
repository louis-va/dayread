import { Request, Response } from 'express';
import database from '../models';
import { IUser } from '../models/user.model';
const Post = database.post;
const User = database.user;

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
    const post = await Post.findById(req.params.id)

    if (!post) return res.status(404).send({ 
      message: "Post not found.",
      error: "post_not_found"
    });

    const [author, commentsNumber] = await Promise.all([
        User.findById(post.author), 
        Post.countDocuments({ commented_on: post._id })
      ]);

    return res.status(200).send({
      id: post._id,
      content: post.content,
      comments: commentsNumber,
      favourites: 0,
      posted_by: {
        id: author?._id,
        username: author?.username
      },
      is_comment: post.is_comment,
      commented_on: post.commented_on,
      created_date: post.created_date
    });

  } catch (err: any) {
    if (err.name === "CastError") return res.status(404).send({ 
      message: "Post not found.",
      error: "post_not_found"
    });
    return res.status(500).send({ message: err });
  }
}

export default { addPost, getPost }