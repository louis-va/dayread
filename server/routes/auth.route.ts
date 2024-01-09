import express, { Request, Response } from 'express';
import passport from 'passport'
import auth from '../controllers/auth.controller'
import { checkDuplicateEmail } from '../middlewares/validateSignUp';
import '../config/passport'

const router = express.Router();

router.post("/signup",
  [checkDuplicateEmail],
  auth.signUp
);

router.post("/signin",
  auth.signIn
);

router.post("/signout",
  auth.signOut
);

router.get("/protected",
  passport.authenticate("jwt", { session: false, failureRedirect: '/login' }),
  (req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      msg: "You are successfully authenticated to this route!",
    });
  }
);

export default router;