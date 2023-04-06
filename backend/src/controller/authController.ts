import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { google } from '../assets/passportConfig';
import { Router } from 'express';
import session from 'express-session';
import 'dotenv/config';

export const router = Router();

////////// Initialize session //////////
router.use(
  session({
    resave: false,
    saveUninitialized: false,
    logErrors: true,
    cookie: {
      httpOnly: false,
      secure: false,
    },
    secret: process.env.SECRET,
  })
);

////////// Initialise passports //////////
router.use(passport.initialize());
router.use(passport.session());

////////// Google strategy //////////
passport.use(
  new GoogleStrategy(google, function (
    request,
    accessToken,
    refreshToken,
    profile,
    done
  ) {
    // Add your own logic for finding or creating a user
    const user = {
      googleId: profile.id,
      name: profile.displayName,
      email: profile.emails[0].value,
    };
    console.log(user);
    // Call done with the user object
    return done(null, user);
  })
);

// Redirect the user to the Google signin page
router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

// Serialize user into the sessions
passport.serializeUser((user, done) => done(null, user));
// Deserialize user from the sessions
passport.deserializeUser((user, done) => done(null, user));

// On authenticated on Google login page
router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/auth/google/callback',
  }),
  function (req, res) {
    console.log('Redirection is called');
    // Redirect to the home page of your application
    res.redirect(process.env.API_BASED_URL);
  }
);

// Logout the user
router.get('/logout', function (req, res, next) {
  if (req.user) {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
    });
  }
  res.redirect('/');
});

////////// Check Google authentication //////////
// Middleware to check if the user is authenticated
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    console.log(req);
    return next();
  } else {
    return res.redirect('/auth/google');
  }
}

router.use('/', ensureAuthenticated);
