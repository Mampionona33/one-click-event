import express, { Express, NextFunction, Request, Response } from 'express';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { router as userRoutes } from './routes/userRoutes';

const app: Express = express();

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('response form back  123');
  next();
});

app.use('/api/v1/users', userRoutes);

export default app;
