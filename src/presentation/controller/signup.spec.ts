import { SignupController } from './signup';

describe('Signup Controller', () => {
  it('should be defined', () => {
    const sut = new SignupController();
    expect(sut).toBeDefined();
  });
});
