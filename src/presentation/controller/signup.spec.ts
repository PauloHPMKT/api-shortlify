import { SignupController } from './signup';

const makeSut = (): SutTypes => {
  const sut = new SignupController();
  return { sut };
};

interface SutTypes {
  sut: SignupController;
}

describe('Signup Controller', () => {
  it('should be defined', () => {
    const sut = makeSut();
    expect(sut).toBeDefined();
  });
});
