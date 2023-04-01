import express, { Express, NextFunction, Request, Response } from 'express';
import session from 'express-session';
import { router as userRoutes } from './routes/userRoutes';
import {
  router as authRoutes,
  requireFacebookAuth,
} from './controller/fbAuthController';
export const app: Express = express();

app.use(requireFacebookAuth);
app.use(
  session({
    secret: 'your secret key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('response form back 123');
  next();
});

app.use('/api/v1/users', userRoutes);
