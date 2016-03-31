import passport from 'passport';
import config from '../../config/config';
import { Strategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import controller from '../controllers/index';

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
  secretOrKey: config.secret,
};

const jwtLogin = new Strategy(jwtOptions, function(payload, done) {
  return controller.getUser({ email: payload.sub })
  .then((user) => {
    if(user){
      return done(null, user);
    } else {
      return done(null, false);
    }
  })
  .catch((error) => done(error, false))
});

passport.use(jwtLogin);
