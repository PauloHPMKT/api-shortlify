import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper';

//const port = process.env.APP_PORT
//const mongoUri = process.env.DB_HOST

MongoHelper.connect('mongodb://172.23.126.233:27017/shortlify')
  .then(async () => {
    console.warn('Connected to MongoDB');
    const app = (await import('./config/app')).default;
    app.listen(3003, () => {
      console.warn(`Server running at http://localhost:${3003}`);
    });
  })
  .catch(console.error);
