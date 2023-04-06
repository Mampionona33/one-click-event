import express, { Express, NextFunction, Request, Response } from 'express';
import { router as userRoutes } from './routes/userRoutes';
import { router as authController } from './controller/authController';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config';

export const app: Express = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/', authController);

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.redirect('/api/v1');
});

const whiteList = [process.env.CLIENT_BASED_URL];

var corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
app.get('/api/v1', (req: Request, res: Response, next: NextFunction) => {
  res.send('welcom to my app');
});
// app.get(
//   '/api/v1',
//   cors(corsOptions),
//   (req: Request, res: Response, next: NextFunction) => {
//     res.send('welcom to my app');
//   }
// );

//////////  LOGGER //////////
if (process.env.NODE_ENV != 'production') {
  console.table([
    {
      Variables: 'facebookCallbackUrl',
      url: process.env.FACEBOOK_CALLBACK_URL,
    },
    {
      Variables: 'process.env.FACEBOOK_APP_ID',
      url: process.env.FACEBOOK_APP_ID,
    },
    {
      Variables: 'process.env.FACEBOOK_APP_SECRET',
      url: process.env.FACEBOOK_APP_SECRET,
    },
    {
      Variables: 'process.env.CLIENT_BASED_URL',
      url: process.env.CLIENT_BASED_URL,
    },
    {
      Variables: 'process.env.GOOGLE_CLIENT_ID',
      url: process.env.GOOGLE_CLIENT_ID,
    },
    {
      Variables: 'process.env.GOOGLE_CLIENT_SECRET',
      url: process.env.GOOGLE_CLIENT_SECRET,
    },
    {
      Variables: 'process.env.GOOGLE_CALLBACK_URL',
      url: process.env.GOOGLE_CALLBACK_URL,
    },
  ]);
}
