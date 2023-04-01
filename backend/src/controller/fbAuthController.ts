import express, {
  Express,
  NextFunction,
  Request,
  Response,
  Router,
} from 'express';
import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import * as dotenv from 'dotenv';
import { session } from 'express-session';
dotenv.config();

export const router = Router();

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,

      clientSecret: process.env.FACEBOOK_APP_SECRET,

      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    },

    function (accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
    }
  )
);

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/auth/facebook' }),

  function (req: Request, res: Response) {
    console.log('req', req.user);
    res.redirect('/api/v1/users');

    res.render('data', {
      user: req.user,
    });
  }
);
