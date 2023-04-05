import debug from 'debug';
import express, {
  Express,
  NextFunction,
  Request,
  Response,
  Router,
} from 'express';
import session from 'express-session';
import passport, { Profile } from 'passport';
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

passport.serializeUser(function (user: any, done) {
  done(null, user);
});

passport.deserializeUser(function (user: any, done) {
  done(null, user);
});

/* 
  use only FACEBOOK_CALLBACK_URL for all node environment
  but it's value different for each environment in
  the vercel application not in this authController
*/

const facebookCallbackUrl =
  process.env.FACEBOOK_CALLBACK_URL ||
  'http://localhost:3000/auth/facebook/callback';

let basedUrl = '/api/v1';


if (process.env.USER_BASED_URL) {
  basedUrl = process.env.USER_BASED_URL;
}

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: facebookCallbackUrl,
    },
    function (accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
    }
  )
);

// Add a handler for user logout
passport.use(
  'facebook-logout',
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: facebookCallbackUrl,
      enableProof: true,
      passReqToCallback: true,
    },
    function (req: Request, accessToken, refreshToken, profile: Profile, done) {
      process.nextTick(function () {
        // Clear the user session and logout the user
        req.logout(function (err) {
          if (err) {
            return done(err);
          }
          return done(null, profile);
        });
      });
    }
  )
);

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/auth/facebook',
  }),
  function (req: Request, res: Response) {
    console.log('Redirection is called');
    res.redirect(basedUrl); // Rediriger vers la page d'accueil de votre application
  }
);

router.get('/', function (req: Request, res: Response) {
  if (req.isAuthenticated()) {
    res.redirect(basedUrl); // Rediriger vers la page d'accueil de votre application
  } else {
    res.redirect('/auth/facebook');
  }
});
