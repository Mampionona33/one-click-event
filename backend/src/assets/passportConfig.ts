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
  clientID: process.env.GMAIL_APP_ID,
  clientSecret: process.env.GMAIL_APP_SECRET,
  //todo: based on env, change url to localhost, dev or prod
  callbackURL: `${process.env.API_BASED_URL}/google/callback`,
};
