import { Router } from 'express';

export default (router: Router) => {
  router.post('/signup', (req, res) => {
    res.status(201).send({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      passwordConfirmation: 'any_password',
    });
  });
};
