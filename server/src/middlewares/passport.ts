import { Strategy as JwtStrategy, StrategyOptions } from 'passport-jwt'
import passport from 'passport'
import database from '../models';
import { JwtPayload } from '../types/JwtPayload';
import env from '../../env.config'
const User = database.user;

/**
 * Extracts the jwt from a cookie
 * @param req Http Request
 */
const cookieExtractor = (req: any) => {
  let token = null
  if(req && req.session) {
    token = req.session.token
  }
  return token;
};

const useJwtStrategy = () => {
  const opts: StrategyOptions = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: env.JWT_SECRET,
    algorithms: ["HS256"]
  }
  
  passport.use(new JwtStrategy(opts, async (jwt_payload: JwtPayload, done) => {
    try {
      const user = await User.findOne({ _id: jwt_payload.sub })
      if (user) return done(null, user)
      else return done(null, false)
    } catch(err) {
      return done(err, false)
    }
  }));
}

export { useJwtStrategy }