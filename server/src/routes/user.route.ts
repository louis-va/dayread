import express from 'express';
import passport from 'passport';
import user from '../controllers/user.controller'
import { checkExistingUser, checkFollowingUser, checkNotFollowingUser } from '../middlewares/validateUser';

const router = express.Router();

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

export default router;