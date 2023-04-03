import express, { Express, NextFunction, Request, Response } from 'express';
import { router as userRoutes } from './routes/userRoutes';
import { router as authController } from './controller/authController';
import morgan from 'morgan';
import cors from 'cors';

export const app: Express = express();

// app.use(morgan('combined'));

const allowlist = [process.env.CLIENT_BASED_URL];

const corsOptionsDelegate = (req: Request, callback: Function) => {
  let corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use(cors(corsOptionsDelegate));

app.use(
  cors({
    origin: 'http://localhost:8080', // Allow requests from only this domain
  })
);

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
