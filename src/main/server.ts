import 'dotenv/config';
import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper';

const port = process.env.APP_PORT;
const mongoUri = process.env.DB_HOST;

MongoHelper.connect(mongoUri)
  .then(async () => {
    console.warn('Connected to MongoDB');
    const app = (await import('./config/app')).default;
    app.listen(port, () => {
      console.warn(`Server running at http://localhost:${port}`);
    });
  })
  .catch(console.error);
