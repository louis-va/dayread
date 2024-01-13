import { Request, Response } from 'express';
import database from '../models';
import { IUser } from '../models/user.model';
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

    const commentsNumber = await Post.countDocuments({ commented_on: post._id })
    const author = post.author as IUser

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

    const postsDetails = await Promise.all(
      posts.map(async (post) => {
        const commentsNumber = await Post.countDocuments({ commented_on: post._id });
        const author = post.author as IUser

        return {
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
        };
      })
    );

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