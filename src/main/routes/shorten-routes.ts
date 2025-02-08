import { Router } from 'express';

export default (router: Router) => {
  router.post('/shorten', (req, res) => {
    res.json({ message: 'Hello World' });
  });
};
