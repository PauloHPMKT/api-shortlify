import { Express } from 'express';
import { bodyParser } from '../middlewares/body-parser';
import { cors } from '../middlewares/cors';

export default (app: Express): void => {
  const middlewares = [bodyParser, cors];
  middlewares.forEach((middleware) => app.use(middleware));
};
