import { Router } from 'express';
import { expressAdapter } from '../adapters/express-adapter';
import { makeGenarateShortenLinkController } from '../factories/shorten';

export default (router: Router) => {
  router.post('/shorten', expressAdapter(makeGenarateShortenLinkController()));
};
