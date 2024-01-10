import express, { Request, Response } from 'express';
import passport from 'passport'
import auth from '../controllers/auth.controller'
import { checkDuplicateEmail, checkDuplicateUsername, validatePassword } from '../middlewares/validateSignUp';

const router = express.Router();

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     tags: 
 *      - Auth
 *     summary: Register a new user
 *     description: Create a new user account with the provided credentials.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               username:
 *                 type: string
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *               - username
 *               - firstname
 *               - lastname
 *     responses:
 *       200:
 *         description: User successfully registered.
 *       400:
 *         description: Invalid request data.
 *       409:
 *         description: Conflict - User or email already exists.
 * 
 */
router.post("/signup",
  [
    checkDuplicateEmail,
    checkDuplicateUsername,
    validatePassword
  ],
  auth.signUp
);

/**
 * @swagger
 * /auth/signin:
 *   post:
 *     tags: 
 *      - Auth
 *     summary: Authenticate user
 *     description: Authenticate and log in the user using provided credentials.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: A user object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 email:
 *                   type: string
 *                   example: johndoe@gmail.com
 *                 username:
 *                   type: string
 *                   example: john-doe
 *                 firstname:
 *                   type: string
 *                   example: John
 *                 lastname:
 *                   type: string
 *                   example: Doe
 *       400:
 *         description: Invalid credentials.
 * 
 */
router.post("/signin",
  auth.signIn
);

/**
 * @swagger
 * /auth/signout:
 *   post:
 *     tags: 
 *      - Auth
 *     summary: Logout user
 *     description: Log out the authenticated user.
 *     responses:
 *       200:
 *         description: User successfully logged out.
 * 
 */
router.post("/signout",
  auth.signOut
);

router.get("/protected",
  passport.authenticate("jwt", { session: false, failureRedirect: '' }),
  (req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      msg: "You are successfully authenticated to this route!",
    });
  }
);

export default router;