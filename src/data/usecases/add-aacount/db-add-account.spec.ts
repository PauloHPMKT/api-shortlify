import { Account } from '../../../domain/entities/Account';
import { AccountModel } from '../../../domain/models/account';
import { AddAccountRepository } from '../../protocols/add-account-repository';
import { Encrypter } from '../../protocols/encrypter';
import { DbAddAccount } from './db-add-account';

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(accountData: AccountModel): Promise<Account> {
      return new Promise((resolve) =>
        resolve({
          id: 'valid_id',
          name: 'valid_name',
          email: 'valid_email',
          password: 'hashed_password',
          shortenLinks: [],
          avatar: null,
          isActive: true,
          createdAt: new Date(),
        }),
      );
    }
  }
  return new AddAccountRepositoryStub();
};

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return new Promise((resolve) => resolve('hashed_password'));
    }
  }
  return new EncrypterStub();
};

const makeSut = (): SutTypes => {
  const addAccountRepositoryStub = makeAddAccountRepository();
  const encrypterStub = makeEncrypter();
  const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub);
  return {
    sut,
    encrypterStub,
    addAccountRepositoryStub,
  };
};

interface SutTypes {
  sut: DbAddAccount;
  encrypterStub: Encrypter;
  addAccountRepositoryStub: AddAccountRepository;
}

describe('DbAddAccount Usecase', () => {
  it('should be defined', () => {
    const { sut } = makeSut();
    expect(sut).toBeDefined();
  });

  it('should call Encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut();
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt');
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password',
    };
    await sut.add(accountData);
    expect(encryptSpy).toHaveBeenCalledWith('hashed_password');
  });

  it('should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut();
    jest
      .spyOn(encrypterStub, 'encrypt')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password',
    };
    const promise = sut.add(accountData);
    await expect(promise).rejects.toThrow();
  });

  it('should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add');
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password',
      shortenLinks: [],
      avatar: null,
      isActive: true,
      createdAt: new Date(),
    };
    await sut.add(accountData);
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password',
      shortenLinks: [],
      avatar: null,
      isActive: true,
      createdAt: new Date(),
    });
  });

  it('should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    jest
      .spyOn(addAccountRepositoryStub, 'add')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password',
      shortenLinks: [],
      avatar: null,
      isActive: true,
      createdAt: new Date(),
    };
    const promise = sut.add(accountData);
    await expect(promise).rejects.toThrow();
  });
});
