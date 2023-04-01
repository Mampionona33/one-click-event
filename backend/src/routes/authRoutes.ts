import express, {
  Express,
  NextFunction,
  Request,
  Response,
  Router,
} from 'express';
import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';

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
      clientID: 'Client ID',

      clientSecret: 'Client Secret',

      callbackURL: 'http://localhost:3000/auth/facebook/callback',
    },

    function (accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
    }
  )
);

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get(
  '/auth/facebook/callback',

  passport.authenticate('facebook', { failureRedirect: '/' }),

  function (req: Request, res: Response) {
    console.log('req', req.user);

    res.render('data', {
      user: req.user,
    });
  }
);
