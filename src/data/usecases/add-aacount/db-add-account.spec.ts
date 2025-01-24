import { DbAddAccount } from './db-add-account';

const makeSut = (): SutTypes => {
  const sut = new DbAddAccount();
  return {
    sut,
  };
};

interface SutTypes {
  sut: DbAddAccount;
}

describe('DbAddAccount Usecase', () => {
  it('should be defined', () => {
    const { sut } = makeSut();
    expect(sut).toBeDefined();
  });
});
