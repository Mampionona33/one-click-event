import debug from 'debug';
import express, {
  Express,
  NextFunction,
  Request,
  Response,
  Router,
} from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import * as dotenv from 'dotenv';
dotenv.config();

export const router = Router();
const debugSession = debug('app:session');
const debugPassport = debug('app:passport');

router.use(
  session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    logErrors: true,
    logger: (msg) => debugSession(msg),
    cookie: {
      httpOnly: false,
      secure: false,
    },
  })
);

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
      debug('user profile', profile);
      return cb(null, profile);
    }
  )
);

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/', function (req: Request, res: Response) {
  if (req.isAuthenticated()) {
    res.redirect('/');
  } else {
    res.redirect('/auth/facebook');
  }
});

router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/auth/facebook',
    successRedirect: process.env.USER_BASED_URL,
  }),
  (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err) {
      res.status(401).send('Error during authentication');
      res.end();
    }
  }

  // function (req: Request, res: Response, next: NextFunction) {
  //   console.log('req', req.user);
  //   req.login(req.user, function (err) {
  //     if (err) {
  //       return next(err);
  //     }
  //     return res.redirect('/api/v1/users');
  //   });
  // }
  // function (req: Request, res: Response) {
  //   console.log('req', req.user);
  //   res.redirect('/api/v1/users');

  //   res.render('data', {
  //     user: req.user,
  //   });
  // }
);
