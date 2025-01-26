import { Link } from './Link';

const makeSut = (): Link => {
  const sut = new Link();
  return sut;
};

describe('Link Entity', () => {
  it('should be defined', () => {
    const sut = makeSut();
    expect(sut).toBeDefined();
  });
});
