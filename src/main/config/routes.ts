import { Express, Router } from 'express';
import fg from 'fast-glob';

export default (app: Express): void => {
  const router = Router();
  app.use('/api', router);
  const routerPath = '**/src/main/routes/**routes.ts';

  fg.sync(routerPath).map(async (file) =>
    (await import(`../../../${file}`)).default(router),
  );
};
