import express, { Express, NextFunction, Request, Response } from 'express';
const app: Express = express();

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('response form back');
  next();
});

export default app;
