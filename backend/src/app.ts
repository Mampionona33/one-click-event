import express, { Express, NextFunction, Request, Response } from 'express';
import { router as userRoutes } from './routes/userRoutes';
import { router as authController } from './controller/authController';
import morgan from 'morgan';
export const app: Express = express();

app.use(morgan('combined'));

app.use(authController);

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.redirect(process.env.USER_BASED_URL);
});

app.get(
  process.env.USER_BASED_URL,
  (req: Request, res: Response, next: NextFunction) => {
    res.send('Welcome to one click event api');
    next();
  }
);

app.use(`${process.env.USER_BASED_URL}/users`, userRoutes);
