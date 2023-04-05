import { Router } from 'express';
import {
  Response,
  RequestHandlerParams,
  RequestHandler,
} from 'express-serve-static-core';
import session from 'express-session';
import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { facebook, google } from '../assets/passportConfig';

interface User {
  firstName: string;
  lastName: string;
  email: string;
}

interface CustomRequest extends Request {
  session: any;
  user?: User;
}

export const router = Router();
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
router.use(passport.initialize());
router.use(passport.session());

////////// Format data//////////

const formatGoogle = (profile) => {
  return {
    firstName: profile.given_name,
    lastName: profile.family_name,
    email: profile.emaiL,
  };
};
const formatFB = (profile) => {
  return {
    firstName: profile.first_name,
    lastName: profile.last_name,
    email: profile.email,
  };
};

////////// GOOGLE //////////
passport.use(
  new GoogleStrategy(
    google,
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      //done(err, user) will return the user we got from fb
      done(null, formatGoogle(profile._json));
    }
  )
);

////////// FACEBOOK //////////
passport.use(
  new FacebookStrategy(
    facebook,
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      //done(err, user) will return the user we got from fb
      done(null, formatFB(profile._json));
    }
  )
);

////////// Serialize/Deserialize //////////

// Serialize user into the sessions
passport.serializeUser((user, done) => done(null, user));

// Deserialize user from the sessions
passport.deserializeUser((user, done) => done(null, user));

// will go access 3rd party to get permission to access the data
router.get(
  '/user/login/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
); //define the scope to also access the email
router.get(
  '/user/login/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
); //define this scope to have access to the email

//once permission to exchange data is granted, a callback will be fired
router.get(
  '/user/login/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/google' }),
  // Redirect user back to the mobile app using deep linking
  (req, res: Response) => {
    // const customReq = req as CustomRequest;
    res.redirect(
      '/auth/google/callback'
      // `memcaps://app/login?firstName=${customReq.user.firstName}/lastName=${customReq.user.lastName}/email=${customReq.user.email}`
    );
  }
);

router.get(
  '/user/login/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/google' }),
  // Redirect user back to the mobile app using deep linking
  (req, res) => {
    res.redirect(
      `memcaps://app/login?firstName=${req.user.firstName}/lastName=${req.user.lastName}/email=${req.user.email}`
    );
  }
);

router.get('/logout', function (req, res) {
  console.log('here');
  req.session.destroy(function () {
    res.redirect('/login');
  });
});

// import debug from 'debug';
// import express, {
//   Express,
//   NextFunction,
//   Request,
//   Response,
//   Router,
// } from 'express';
// import session from 'express-session';
// import passport, { Profile } from 'passport';
// import { Strategy as FacebookStrategy } from 'passport-facebook';
// import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
// import * as dotenv from 'dotenv';
// dotenv.config();

// export const router = Router();
// const debugSession = debug('app:session');
// const debugPassport = debug('app:passport');

// router.use(
//   session({
//     secret: 'your_secret_key',
//     resave: false,
//     saveUninitialized: false,
//     logErrors: true,
//     logger: (msg) => debugSession(msg),
//     cookie: {
//       httpOnly: false,
//       secure: false,
//     },
//   })
// );

// router.use(passport.initialize());
// router.use(passport.session());

// passport.serializeUser(function (user: any, done) {
//   done(null, user);
// });

// passport.deserializeUser(function (user: any, done) {
//   done(null, user);
// });

// /*
//   use only FACEBOOK_CALLBACK_URL for all node environment
//   but it's value different for each environment in
//   the vercel application not in this authController
// */

// const facebookCallbackUrl =
//   process.env.FACEBOOK_CALLBACK_URL ||
//   'http://localhost:3000/auth/facebook/callback';

// let basedUrl = '/api/v1';

// if (process.env.USER_BASED_URL) {
//   basedUrl = process.env.USER_BASED_URL;
// }

// // Add a variable to store the authentication provider
// let authProvider = '';

// // Configure the Facebook authentication strategy
// passport.use(
//   'facebook',
//   new FacebookStrategy(
//     {
//       clientID: process.env.FACEBOOK_APP_ID,
//       clientSecret: process.env.FACEBOOK_APP_SECRET,
//       callbackURL: facebookCallbackUrl,
//     },
//     function (accessToken, refreshToken, profile, cb) {
//       return cb(null, profile);
//     }
//   )
// );

// // Add a handler for user logout
// passport.use(
//   'facebook-logout',
//   new FacebookStrategy(
//     {
//       clientID: process.env.FACEBOOK_APP_ID,
//       clientSecret: process.env.FACEBOOK_APP_SECRET,
//       callbackURL: facebookCallbackUrl,
//       enableProof: true,
//       passReqToCallback: true,
//     },
//     function (req: Request, accessToken, refreshToken, profile: Profile, done) {
//       process.nextTick(function () {
//         // Clear the user session and logout the user
//         req.logout(function (err) {
//           if (err) {
//             return done(err);
//           }
//           return done(null, profile);
//         });
//       });
//     }
//   )
// );

// // Configure the Google authentication strategy
// passport.use(
//   'google',
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: process.env.GOOGLE_CALLBACK_URL,
//       passReqToCallback: true,
//     },
//     (req: Request, accessToken, refreshToken, profile, done) => {
//       (err, user) => {
//         return done(err, user);
//       };
//     }
//   )
// );

// // Middleware to check if user is authenticated
// const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.status(401).json({ message: 'User not authenticated' });
// };

// // Facebook authentication route
// router.get('/auth/facebook', passport.authenticate('facebook'));

// // Facebook authentication callback route
// router.get(
//   '/auth/facebook/callback',
//   passport.authenticate('facebook', {
//     successRedirect: `${basedUrl}/auth/success`,
//     failureRedirect: `${basedUrl}/auth/failure`,
//   })
// );

// // Facebook logout route
// router.get('/auth/facebook/logout', (req: Request, res: Response) => {
//   // Set the authentication provider
//   authProvider = 'facebook';
//   // Redirect to the Facebook logout page
//   res.redirect(
//     `https://www.facebook.com/logout.php?next=${process.env.FACEBOOK_LOGOUT_URL}&access_token=${req.user.accessToken}`
//   );
// });

// // Google authentication route
// router.get(
//   '/auth/google',
//   passport.authenticate('google', {
//     scope: ['profile', 'email'],
//   })
// );

// // Google authentication callback route
// router.get(
//   '/auth/google/callback',
//   passport.authenticate('google', {
//     successRedirect: `${basedUrl}/auth/success`,
//     failureRedirect: `${basedUrl}/auth/failure`,
//   })
// );

// // Google logout route
// router.get('/auth/google/logout', (req: Request, res: Response) => {
//   // Set the authentication provider
//   authProvider = 'google';
//   // Redirect to the Google logout page
//   res.redirect(
//     `https://accounts.google.com/o/oauth2/revoke?token=${req.user.accessToken}`
//   );
// });

// // Success authentication route
// router.get('/auth/success', isAuthenticated, (req: Request, res: Response) => {
//   if (authProvider === 'facebook') {
//     // Redirect to the Facebook logout page to remove permissions
//     res.redirect(
//       `https://www.facebook.com/logout.php?next=${process.env.FACEBOOK_LOGOUT_URL}&access_token=${req.user.accessToken}`
//     );
//   } else if (authProvider === 'google') {
//     // Redirect to the Google logout page to remove permissions
//     res.redirect(
//       `https://accounts.google.com/o/oauth2/revoke?token=${req.user.accessToken}`
//     );
//   }
//   res.json({ message: 'User authenticated successfully' });
// });

// // Failure authentication route
// router.get('/auth/failure', (req: Request, res: Response) => {
//   res.status(401).json({ message: 'User authentication failed' });
// });

// export default router;
