import { Router } from 'express';
import passportFacebook from 'passport-facebook';
import passport from 'passport';
import * as dotenv from 'dotenv';

dotenv.config();

// require('dotenv-ts').config();
// import User from '../models/userModel';

const FacebookStrategy = passportFacebook.Strategy;

export const router = Router();

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID!,
      clientSecret: process.env.FACEBOOK_APP_SECRET!,
      callbackURL: 'http://localhost:3000/auth/facebook/callback',
    },
    function (
      accessToken: string,
      refreshToken: string,
      profile: any,
      cb: Function
    ) {
      console.log({
        facebookId: profile.id,
      });
      // User.findOrCreate(
      //   { facebookId: profile.id },
      //   function (err: Error, user: any) {
      //     return cb(err, user);
      //   }
      // );
    }
  )
);

(router as any).get(
  '/auth/facebook',
  (passport as any).authenticate('facebook')
);

(router as any).get(
  '/auth/facebook/callback',
  (passport as any).authenticate('facebook', { failureRedirect: '/login' }),
  function (req: any, res: any) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);
