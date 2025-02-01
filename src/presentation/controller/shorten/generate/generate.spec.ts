import { GenerateBitlinkController } from './generate';

const makeSut = (): GenerateBitlinkController => {
  return new GenerateBitlinkController();
};

describe('GenerateBitlinkController', () => {
  it('should be defined', () => {
    const sut = makeSut();
    expect(sut).toBeDefined();
  });
});
