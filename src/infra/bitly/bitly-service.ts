import { ShortenLink } from '../../data/protocols/shortenlink';

export class BitlyService implements ShortenLink {
  private readonly apiUrl = process.env.BITLY_URL;
  private readonly apiKey = process.env.BITLY_TOKEN;

  async shorten(url: string): Promise<any> {
    const response = await fetch(`${this.apiUrl}/shorten`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({ long_url: url }),
    });
    return response;
  }
}
