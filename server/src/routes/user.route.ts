import express from 'express';
import passport from 'passport';
import user from '../controllers/user.controller'
import { checkExistingUser, checkFollowingUser, checkNotFollowingUser, checkValidEditProfileParams } from '../middlewares/validateUser';
import { checkPageQuery } from '../middlewares/validateQueryParams';

const router = express.Router();

/**
 * @swagger
 * /user/{username}:
 *   get:
 *     tags: 
 *      - User
 *     summary: Fetch user information
 *     description: Fetch a user's information.
 *     parameters:
 *      - in: path
 *        name: username
 *        required: true
 *        schema:
 *          type: string
 *          minLength: 1
 *        description: User to fetch
 *     responses:
 *       200:
 *         description: Successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   example: john-doe
 *                 firstname:
 *                   type: string
 *                   example: John
 *                 lastname:
 *                   type: string
 *                   example: Doe
 *                 bio:
 *                   type: string
 *                   example: Hey i'm John Doe.
 *                 followers:
 *                   type: number
 *                   example: 104
 *                 following:
 *                   type: number
 *                   example: 131
 *                 is_following:
 *                   type: boolean
 *                   example: true
 *                 is_self:
 *                   type: boolean
 *                   example: false
 *       404:
 *         description: Invalid username.
 * 
 */
router.get("/:username",
  [
    passport.authenticate("jwt", { session: false }),
    checkExistingUser
  ],
  user.getUserInformation
);

/**
 * @swagger
 * /user/edit:
 *   put:
 *     tags: 
 *      - User
 *     summary: Edit user information
 *     description: Edit the logged in user's information.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 example: John
 *               lastname:
 *                 type: string
 *                 example: Doe
 *               bio:
 *                 type: boolean
 *                 example: Hey I'm John
 *             required:
 *               - firstname
 *               - lastname
 *               - bio
 *     responses:
 *       200:
 *         description: User successfully updated.
 *       400:
 *         description: Invalid parameters.
 * 
 */
router.put("/edit",
  [
    passport.authenticate("jwt", { session: false }),
    checkValidEditProfileParams
  ],
  user.editUserInformation
);

/**
 * @swagger
 * /user/{username}/follow:
 *   post:
 *     tags: 
 *      - User
 *     summary: Follow a user
 *     description: Follow the user with the specified username.
 *     parameters:
 *      - in: path
 *        name: username
 *        required: true
 *        schema:
 *          type: string
 *          minLength: 1
 *        description: User to follow
 *     responses:
 *       200:
 *         description: User successfully followed.
 *       400:
 *         description: User is already followed.
 *       404:
 *         description: Invalid username.
 * 
 */
router.post("/:username/follow",
  [
    passport.authenticate("jwt", { session: false }),
    checkExistingUser,
    checkFollowingUser
  ],
  user.follow
);

/**
 * @swagger
 * /user/{username}/unfollow:
 *   post:
 *     tags: 
 *      - User
 *     summary: Unfollow a user
 *     description: Unfollow the user with the specified username.
 *     parameters:
 *      - in: path
 *        name: username
 *        required: true
 *        schema:
 *          type: string
 *          minLength: 1
 *        description: User to unfollow
 *     responses:
 *       200:
 *         description: User successfully unfollowed.
 *       400:
 *         description: User is not followed.
 *       404:
 *         description: Invalid username.
 * 
 */
router.post("/:username/unfollow",
  [
    passport.authenticate("jwt", { session: false }),
    checkExistingUser,
    checkNotFollowingUser
  ],
  user.unfollow
);

/**
 * @swagger
 * /user/{username}/posts:
 *   get:
 *     tags: 
 *      - User
 *     summary: Fetch user's posts
 *     description: Fetch the 10 most recent posts of a user
 *     parameters:
 *      - in: query
 *        name: page
 *        required: true
 *        schema:
 *          type: string
 *          minLength: 1
 *        description: The page to fetch
 *      - in: path
 *        name: username
 *        required: true
 *        schema:
 *          type: string
 *          minLength: 1
 *        description: User
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
 *                   is_liked:
 *                     type: boolean
 *                     example: true
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
 *                     example: false
 *                   commented_on:
 *                     type: string
 *                     example: null
 *                   created_date:
 *                     type: date
 *                     example: 2023-01-11T15:34:21
 *       400:
 *         description: Missing page in query parameters.
 *       404:
 *         description: Invalid username.
 * 
 */
router.get("/:username/posts",
  [
    passport.authenticate("jwt", { session: false }),
    checkExistingUser,
    checkPageQuery
  ],
  user.getPosts
);

/**
 * @swagger
 * /user/{username}/liked-posts:
 *   get:
 *     tags: 
 *      - User
 *     summary: Fetch user's liked posts
 *     description: Fetch the 10 most recent liked posts of a user
 *     parameters:
 *      - in: query
 *        name: page
 *        required: true
 *        schema:
 *          type: string
 *          minLength: 1
 *        description: The page to fetch
 *      - in: path
 *        name: username
 *        required: true
 *        schema:
 *          type: string
 *          minLength: 1
 *        description: User
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
 *                   is_liked:
 *                     type: boolean
 *                     example: true
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
 *                     example: false
 *                   commented_on:
 *                     type: string
 *                     example: null
 *                   created_date:
 *                     type: date
 *                     example: 2023-01-11T15:34:21
 *       400:
 *         description: Missing page in query parameters.
 *       404:
 *         description: Invalid username.
 * 
 */
router.get("/:username/liked-posts",
  [
    passport.authenticate("jwt", { session: false }),
    checkExistingUser,
    checkPageQuery
  ],
  user.getLikedPosts
);

export default router;