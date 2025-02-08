import { ShortenLink } from '../../data/protocols/shortenlink';

export class BitlyService implements ShortenLink {
  private readonly apiUrl = process.env.BITLY_URL as string;
  private readonly apiKey = process.env.BITLY_TOKEN as string;

  async shorten(url: string): Promise<any> {
    const body = { long_url: url };
    const data = await fetch(`${this.apiUrl}/shorten`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(body),
    });
    const response = await data.json();
    return response;
  }
}
