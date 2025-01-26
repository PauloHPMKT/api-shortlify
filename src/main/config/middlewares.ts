import { Express } from 'express';
import { bodyParser } from '../middlewares/body-parser';
import { cors } from '../middlewares/cors';
import { contentType } from '../middlewares/content-type';

export default (app: Express): void => {
  const middlewares = [bodyParser, cors, contentType];
  middlewares.forEach((middleware) => app.use(middleware));
};
