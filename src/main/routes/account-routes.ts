import { Router } from 'express';
import { expressAdapter } from '../adapters/express-adapter';
import { makeSignupControllerFactory } from '../factories/add-account';

export default (router: Router) => {
  router.post('/signup', expressAdapter(makeSignupControllerFactory()));
};
