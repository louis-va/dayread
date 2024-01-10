import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user.model';

async function checkDuplicateEmail(req: Request, res: Response, next: NextFunction) {
  try {
    const existingUser = await User.findOne({ email: req.body.email })
  
    if (existingUser) {
      res.status(400).send({ message: "Failed! Email is already used" });
      return;
    }
    next();
  } catch(err: any) {
    res.status(500).send({ message: err.message || "Some error occurred while checking email duplication" });
  }
}

async function checkDuplicateUsername(req: Request, res: Response, next: NextFunction) {
  try {
    const existingUser = await User.findOne({ username: req.body.username })
  
    if (existingUser) {
      res.status(400).send({ message: "Failed! Username is already used" });
      return;
    }
    next();
  } catch(err: any) {
    res.status(500).send({ message: err.message || "Some error occurred while checking username duplication" });
  }
}

async function validatePassword(req: Request, res: Response, next: NextFunction) {
  try {
    
    const is10Characters = req.body.password.length >= 10
  
    if (!is10Characters) {
      res.status(400).send({ message: "Failed! Password is too short" });
      return;
    }
    next();
  } catch(err: any) {
    res.status(500).send({ message: err.message || "Some error occurred while validating the password" });
  }
}

export { checkDuplicateEmail, checkDuplicateUsername, validatePassword };