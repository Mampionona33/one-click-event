import { Router } from 'express';
import passportFacebook from 'passport-facebook';
import passport from 'passport';
import dotenv from 'dotenv';
dotenv.config();

const FacebookStrategy = passportFacebook.Strategy;

export const router = Router();

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.FACEBOOK_APP_ID,
//       clientSecret: process.env.FACEBOOK_APP_SECRET,
//       callbackURL: process.env.FACEBOOK_CALLBACK_URL,
//     },
//     function (accessToken, refreshToken, profile, cb) {
//       console.log(profile);
//       User.findOrCreate({ facebookId: profile.id }, function (err, user) {
//         return cb(err, user);
//       });
//     }
//   )
// );

// router.get('/auth/facebook', passport.authenticate('facebook'));

// router.get(
//   '/auth/facebook/callback',
//   passport.authenticate('facebook', { failureRedirect: '/login' }),
//   function (req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   }
// );
