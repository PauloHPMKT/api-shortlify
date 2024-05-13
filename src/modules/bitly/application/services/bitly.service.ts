import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';

@Injectable()
export class BitlyService {
  private readonly bitlyUrl: string;
  private readonly bitlyToken: string;

  constructor(private readonly http: HttpService) {
    this.bitlyUrl = 'https://api-ssl.bitly.com/v4';
    this.bitlyToken = 'a0ee0dfccca7228da50a76644d16f0d35febc0c5';
  }

  async execute(longUrl: string): Promise<string | any> {
    const data = {
      long_url: longUrl,
    };

    try {
      const { long_url } = data;
      const response: AxiosResponse = await this.http
        .post(`${this.bitlyUrl}/shorten`, long_url, {
          headers: {
            Authorization: `Bearer ${this.bitlyToken}`,
            'Content-Type': 'application/json',
          },
        })
        .toPromise();

      const shortenedLink = response.data;
      return shortenedLink;
    } catch (error) {
      console.error('BitlyService error:', error);
      return error;
    }
  }
}
