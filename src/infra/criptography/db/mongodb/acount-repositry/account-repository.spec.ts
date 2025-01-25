import { AccountRepository } from './account-repository';

const makeSut = (): AccountRepository => {
  return new AccountRepository();
};

describe('AccountRepository', () => {
  it('should be defined', () => {
    const sut = makeSut();
    expect(sut).toBeDefined();
  });
});
