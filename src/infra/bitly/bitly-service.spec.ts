import { BitlyService } from './bitly-service';

const makeSut = (): BitlyService => {
  const sut = new BitlyService();
  return sut;
};

describe('BitlyService', () => {
  it('should be defined', () => {
    const sut = makeSut();
    expect(sut).toBeDefined();
  });
});
