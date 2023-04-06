import 'dotenv/config';

export const facebook = {
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  //todo: based on env, change url to localhost, dev or prod
  callbackURL: `${process.env.API_BASED_URL}/auth/facebook/callback`,
  enableProof: true, //to enable secret proof
  profileFields: ['id', 'emails', 'name'], //scope of fields
};

export const google = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
  passReqToCallback: true,
  prompt: true,
};
