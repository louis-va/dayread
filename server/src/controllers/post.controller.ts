import { Request, Response } from 'express';
import { IUser } from '../models/user.model';
import { calculateLikesAndComments } from '../utils/post.utils';
import database from '../models';
const Post = database.post;
const Like = database.like;

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
    const postDetails = await calculateLikesAndComments([post!])

    return res.status(200).send(postDetails[0]);
    
  } catch (err: any) {
    return res.status(500).send({ message: err });
  }
}

async function getComments(req: Request, res: Response) {
  try {
    const posts = await Post.find({ commented_on: req.params.id }).populate('author');
    const postsDetails = await calculateLikesAndComments(posts)

    return res.status(200).send(postsDetails);

  } catch (err: any) {
    return res.status(500).send({ message: err });
  }
}

async function like(req: Request, res: Response) {
  try {
    const user = req.user as IUser

    const like = new Like({
      post: req.params.id,
      liked_by: user!.id,
      date: Date.now()
    })

    await like.save();

    return res.status(200).send({ message: 'Post successfully liked.'});

  } catch (err: any) {
    return res.status(500).send({ message: err });
  }
}

async function unlike(req: Request, res: Response) {
  try {
    const user = req.user as IUser

    const like = await Like.findOne({ liked_by: user.id, post: req.params.id })
    await like!.deleteOne()

    return res.status(200).send({ message: 'Post successfully unliked.'});

  } catch (err: any) {
    return res.status(500).send({ message: err });
  }
}

export default { addPost, getPost, getComments, like, unlike }