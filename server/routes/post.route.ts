import express from 'express';
import passport from 'passport';
import post from '../controllers/post.controller'
import { checkValidContent, checkValidPostId } from '../middlewares/validatePost';

const router = express.Router();

/**
 * @swagger
 * /post:
 *   post:
 *     tags: 
 *      - Post
 *     summary: Add a new post
 *     description: Add a new post with the provided content.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: Today I ate a delicious apple.
 *               commented_on:
 *                 type: string
 *                 description: Post id.
 *                 example: 0
 *             required:
 *               - content
 *     responses:
 *       200:
 *         description: Post successfully created.
 *       400:
 *         description: Invalid request data.
 * 
 */
router.post("/",
  [
    passport.authenticate("jwt", { session: false }),
    checkValidContent
  ],
  post.add
);

/**
 * @swagger
 * /post/{id}:
 *   get:
 *     tags: 
 *      - Post
 *     summary: Fetch a post
 *     description: Fetch the post with the specified id.
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          minimum: 1
 *        description: The post id
 *     responses:
 *       200:
 *         description: Post object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 0
 *                 content:
 *                   type: string
 *                   example: Today I ate a delicious apple.
 *                 comments:
 *                   type: integer
 *                   example: 4 
 *                 favourites:
 *                   type: integer
 *                   example: 23
 *                 author:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 0
 *                     username:
 *                       type: string
 *                       example: john-doe
 *                 is_comment:
 *                   type: boolean
 *                   example: true
 *                 commented_on:
 *                   type: string
 *                   example: 0
 *                 created_date:
 *                   type: date
 *                   example: 2023-01-11T15:34:21
 *       400:
 *         description: Invalid id.
 * 
 */
router.get("/:id",
  [
    passport.authenticate("jwt", { session: false }),
    checkValidPostId
  ],
  post.get
);

export default router;