import express, { Express, NextFunction, Request, Response } from 'express';
import { router as userRoutes } from './routes/userRoutes';

const app: Express = express();

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.send('response form back');
  next();
});

app.use(process.env.USER_BASED_URL, userRoutes);

export default app;
