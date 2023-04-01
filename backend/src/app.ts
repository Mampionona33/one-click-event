import express, { Express, NextFunction, Request, Response } from 'express';
import { router as userRoutes } from './routes/userRoutes';
import { router as authController } from './controller/authController';
import morgan from 'morgan';
export const app: Express = express();

app.use(morgan('combined'));

app.use(authController);

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('response form back te 123');
  next();
});

app.use('/api/v1/users', userRoutes);
