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

  it('should call fetch with correct URL and options', async () => {
    const sut = makeSut();
    const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({}),
    } as any);
    const url = 'http://example.com';
    await sut.shorten(url);
    expect(fetchMock).toHaveBeenCalledWith(`${process.env.BITLY_URL}/shorten`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.BITLY_TOKEN}`,
      },
      body: JSON.stringify({ long_url: url }),
    });
    fetchMock.mockRestore();
  });

  it('should throw an error if fetch fails', async () => {
    const sut = makeSut();
    jest.spyOn(global, 'fetch').mockRejectedValue(new Error('Fetch error'));
    const url = 'http://example.com';
    await expect(sut.shorten(url)).rejects.toThrow('Fetch error');
  });
});
