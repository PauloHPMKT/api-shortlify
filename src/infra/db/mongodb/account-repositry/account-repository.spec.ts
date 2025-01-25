import { MongoHelper } from '../helpers/mongo-helper';
import { AccountMongoRepository } from './account-repository';

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository();
};

describe('AccountRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string);
  });

  afterAll(async () => {
    const accountsCollection = MongoHelper.getCollection('accounts');
    await accountsCollection.deleteMany({});
    await MongoHelper.disconnect();
  });

  it('should be defined', () => {
    const sut = makeSut();
    expect(sut).toBeDefined();
  });

  it('should return an account on success', async () => {
    const sut = makeSut();
    const createdAt = new Date();
    const account = await sut.add({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      shortenLinks: [],
      avatar: null,
      isActive: true,
      createdAt,
    });
    expect(account).toBeTruthy();
    expect(account.id).toBeTruthy();
    expect(account.name).toBe('any_name');
    expect(account.email).toBe('any_email');
    expect(account.password).toBe('any_password');
    expect(account.shortenLinks).toEqual([]);
    expect(account.avatar).toBeNull();
    expect(account.isActive).toBe(true);
    expect(account.createdAt).toBeInstanceOf(Date);
  });
});
