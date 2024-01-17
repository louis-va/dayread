import express from 'express';
import passport from 'passport';
import feed from '../controllers/feed.controller'
import { checkPageQuery } from '../middlewares/validateQueryParams';

const router = express.Router();

/**
 * @swagger
 * /feed:
 *   get:
 *     tags: 
 *      - Feed
 *     summary: Fetch user's feed
 *     description: Fetch the 10 most recent posts of user's followees
 *     parameters:
 *      - in: query
 *        name: page
 *        required: true
 *        schema:
 *          type: string
 *          minLength: 1
 *        description: The page to fetch
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
 *                     example: false
 *                   commented_on:
 *                     type: string
 *                     example: null
 *                   created_date:
 *                     type: date
 *                     example: 2023-01-11T15:34:21
 *       400:
 *         description: Invalid id.
 * 
 */
router.get("/",
  [
    passport.authenticate("jwt", { session: false }),
    checkPageQuery
  ],
  feed.getFeed
);

/**
 * @swagger
 * /feed/discover:
 *   get:
 *     tags: 
 *      - Feed
 *     summary: Fetch user's discovery feed
 *     description: Fetch the 10 most recent posts of user's non-followees
 *     parameters:
 *      - in: query
 *        name: page
 *        required: true
 *        schema:
 *          type: string
 *          minLength: 1
 *        description: The page to fetch
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
 *                     example: false
 *                   commented_on:
 *                     type: string
 *                     example: null
 *                   created_date:
 *                     type: date
 *                     example: 2023-01-11T15:34:21
 *       400:
 *         description: Invalid id.
 * 
 */
router.get("/discover",
  [
    passport.authenticate("jwt", { session: false }),
    checkPageQuery
  ],
  feed.getDiscoveryFeed
);

export default router;