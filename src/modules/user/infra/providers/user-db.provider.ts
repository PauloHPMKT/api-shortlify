import { Provider } from '@nestjs/common';
import { Connection } from 'mongoose';
import { UserSchema } from '../schemas/user.schema';

export const makeUserProvider = (): Provider[] => [
  {
    provide: 'USER_MODEL',
    useFactory: async (connection: Connection) => {
      return connection.model('Users', UserSchema);
    },
    inject: ['DATABASE_CONNECTION'],
  },
];
