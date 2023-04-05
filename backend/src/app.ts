import express, { Express, NextFunction, Request, Response } from 'express';
import { router as userRoutes } from './routes/userRoutes';
import { router as authController } from './controller/authController';
import morgan from 'morgan';
import cors from 'cors';

export const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(morgan('combined'));

const allowlist = [process.env.CLIENT_BASED_URL];

// Middleware Express pour gérer les requêtes
app.use(function (req, res, next) {
  const origin = req.headers.origin;
  if (allowlist.includes(origin)) {
    // Autoriser l'accès à la ressource depuis cette URL
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    // Bloquer l'accès à la ressource depuis toutes les autres URL
    res.setHeader('Access-Control-Allow-Origin', null);
  }
  // Continuer le traitement de la requête
  next();
});

// Rediriger tout les requete vers /api/v1
app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.redirect(process.env.USER_BASED_URL);
});

app.get(
  process.env.USER_BASED_URL,
  (req: Request, res: Response, next: NextFunction) => {
    res.setHeader('title', 'One click event Api');
    const responsData = {
      message: 'Welcome to one click event api',
    };
    res.json(responsData);
    next();
  }
);

app.use(`${process.env.USER_BASED_URL}/users`, userRoutes);

if (process.env.NODE_ENV != 'production') {
  console.table([
    ['facebookCallbackUrl', process.env.FACEBOOK_CALLBACK_URL],
    ['process.env.FACEBOOK_APP_ID', process.env.FACEBOOK_APP_ID],
    ['process.env.FACEBOOK_APP_SECRET', process.env.FACEBOOK_APP_SECRET],
    ['process.env.CLIENT_BASED_URL', process.env.CLIENT_BASED_URL],
  ]);
}
