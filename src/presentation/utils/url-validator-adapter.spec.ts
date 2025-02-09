import validator from 'validator';
import { UrlValidatorAdapter } from './url-validator-adapter';

jest.mock('validator', () => ({
  isURL(): boolean {
    return true;
  },
}));

const makeSut = (): UrlValidatorAdapter => {
  return new UrlValidatorAdapter();
};

describe('URL Validator Adapter', () => {
  it('should return false if validator returns false', () => {
    const sut = makeSut();
    jest.spyOn(validator, 'isURL').mockReturnValueOnce(false);
    const isValid = sut.isValid('invalid_url');
    expect(isValid).toBe(false);
  });

  it('should return true if validator returns true', () => {
    const sut = makeSut();
    const isValid = sut.isValid('valid_url');
    expect(isValid).toBe(true);
  });

  it('should call validator with correct URL', () => {
    const sut = makeSut();
    const isURLSpy = jest.spyOn(validator, 'isURL');
    sut.isValid('http://any_url');
    expect(isURLSpy).toHaveBeenCalledWith('http://any_url', {
      require_protocol: true,
    });
    expect(isURLSpy).toHaveBeenCalledTimes(1);
  });
});
