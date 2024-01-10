import { Request, Response } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import database from '../models';
const User = database.user;

dotenv.config();

async function signUp(req: Request, res: Response) {
  try {
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname
    });

    await user.save();

    return res.status(200).send({ message: "User successfully registered." });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
}

async function signIn(req: Request, res: Response) {
  try {
    const user = await User.findOne({ email: req.body.email })
      
    if (!user) return res.status(400).send({ 
      message: "Invalid credentials.",
      error: "invalid_credentials"
    });
  
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
  
    if (!passwordIsValid) return res.status(400).send({ 
      message: "Invalid credentials.",
      error: "invalid_credentials"
    });
  
    const token = jwt.sign(
      { 
        sub: user.id,
        iat: Date.now()
      },
      process.env.JWT_SECRET!,
      {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: (req.body.remember) ? '30d' : '1h'
      }
    );

    req.session!.token = token

    return res.status(200).send({
      id: user._id,
      email: user.email,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname
    });
  } catch(err) {
    return res.status(500).send({ message: err });
  }
}

async function signOut(req: Request, res: Response) {
  try {
    req.session = null;
    return res.status(200).send({ message: "User successfully logged out." });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
}

export default { signUp, signIn, signOut }