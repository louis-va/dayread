import express from 'express';
import passport from 'passport';
import post from '../controllers/post.controller'
import { checkValidContent } from '../middlewares/validatePost';

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
 *                 example: null
 *             required:
 *               - content
 *     responses:
 *       200:
 *         description: Successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: pid1111
 *       400:
 *         description: Invalid request data.
 * 
 */
router.post("/",
  [
    passport.authenticate("jwt", { session: false }),
    checkValidContent
  ],
  post.addPost
);

/**
 * @swagger
 * /post/{id}:
 *   get:
 *     tags: 
 *      - Post
 *     summary: Fetch a post
 *     description: Fetch the specified post.
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          minLength: 1
 *        description: The post id
 *     responses:
 *       200:
 *         description: Successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: pid1111
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
 *                       example: uid1111
 *                     username:
 *                       type: string
 *                       example: john-doe
 *                 is_comment:
 *                   type: boolean
 *                   example: false
 *                 commented_on:
 *                   type: string
 *                   example: null
 *                 created_date:
 *                   type: date
 *                   example: 2023-01-11T15:34:21
 *       400:
 *         description: Invalid id.
 * 
 */
router.get("/:id",
  [
    passport.authenticate("jwt", { session: false })
  ],
  post.getPost
);

/**
 * @swagger
 * /post/{id}/comments:
 *   get:
 *     tags: 
 *      - Post
 *     summary: Fetch comments
 *     description: Fetch the comments of the specified post.
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          minLength: 1
 *        description: The post id
 *     responses:
 *       200:
 *         description: Successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: pid2222
 *                   content:
 *                     type: string
 *                     example: That's very cool!
 *                   comments:
 *                     type: integer
 *                     example: 0
 *                   favourites:
 *                     type: integer
 *                     example: 4
 *                   author:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: uid2222
 *                       username:
 *                         type: string
 *                         example: jack-smith
 *                   is_comment:
 *                     type: boolean
 *                     example: true
 *                   commented_on:
 *                     type: string
 *                     example: pid1111
 *                   created_date:
 *                     type: date
 *                     example: 2023-01-11T15:34:21
 *       400:
 *         description: Invalid id.
 * 
 */
router.get("/:id/comments",
  [
    passport.authenticate("jwt", { session: false })
  ],
  post.getComments
);

export default router;