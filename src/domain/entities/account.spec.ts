import { Account } from './Account';

const makeSut = (): Account => {
  return new Account({
    name: 'any_name',
    email: 'any_email',
    password: 'any_password',
  });
};

describe('Account entity', () => {
  it('should be defined', () => {
    const sut = makeSut();
    expect(sut).toBeDefined();
  });

  it('should create an account with correct values', () => {
    const sut = makeSut();
    const createdAt = new Date();
    expect(sut).toEqual({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      shortenLinks: [],
      avatar: null,
      isActive: true,
      createdAt,
    });
  });
});
