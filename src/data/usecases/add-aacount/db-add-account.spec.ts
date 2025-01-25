import { Account } from '../../../domain/entities/Account';
import { AccountModel } from '../../../domain/models/account';
import { AddAccountRepository } from '../../protocols/add-account-repository';
import { VerifyAccountRepository } from '../../protocols/verify-account-repository';
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

const makeVerifyAccountRepository = (): VerifyAccountRepository => {
  class AccountRepositoryStub implements VerifyAccountRepository {
    async get(value: string): Promise<boolean> {
      return new Promise((resolve) => resolve(false));
    }
  }
  return new AccountRepositoryStub();
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
  const verifyAccountRepositoryStub = makeVerifyAccountRepository();
  const encrypterStub = makeEncrypter();
  const sut = new DbAddAccount(
    encrypterStub,
    addAccountRepositoryStub,
    verifyAccountRepositoryStub,
  );
  return {
    sut,
    encrypterStub,
    addAccountRepositoryStub,
    verifyAccountRepositoryStub,
  };
};

interface SutTypes {
  sut: DbAddAccount;
  encrypterStub: Encrypter;
  addAccountRepositoryStub: AddAccountRepository;
  verifyAccountRepositoryStub: VerifyAccountRepository;
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
    const createdAt = new Date();
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password',
      shortenLinks: [],
      avatar: null,
      isActive: true,
      createdAt,
    };
    await sut.add(accountData);
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password',
      shortenLinks: [],
      avatar: null,
      isActive: true,
      createdAt,
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

  it('should throw if a account already exists', async () => {
    const { sut, verifyAccountRepositoryStub } = makeSut();
    jest
      .spyOn(verifyAccountRepositoryStub, 'get')
      .mockReturnValueOnce(new Promise((resolve) => resolve(true)));
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

  it('should return an account on success', async () => {
    const { sut } = makeSut();
    const createdAt = new Date();
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password',
      shortenLinks: [],
      avatar: null,
      isActive: true,
      createdAt,
    };
    const account = await sut.add(accountData);
    expect(account).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password',
      shortenLinks: [],
      avatar: null,
      isActive: true,
      createdAt,
    });
  });
});
