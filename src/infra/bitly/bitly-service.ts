import { ShortenLink } from '../../data/protocols/shorten/shortenlink';
import { Link } from '../../domain/entities/shorten/Link';

export class BitlyService implements ShortenLink {
  private readonly apiUrl = process.env.BITLY_URL as string;
  private readonly apiKey = process.env.BITLY_TOKEN as string;

  async shorten(url: string): Promise<Link> {
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

    return this.customResponse(response);
  }

  private customResponse(response: any): Link {
    return {
      link: response.link,
      long_url: response.long_url,
      custom_id: response.id,
      references: response.references,
      archived: response.archived,
      tags: response.tags,
      created_at: response.created_at,
    };
  }
}
