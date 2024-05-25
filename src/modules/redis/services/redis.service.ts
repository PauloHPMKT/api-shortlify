import { Inject, Injectable } from '@nestjs/common';
import { RedisRepository } from '../repository/redis.repository';

@Injectable()
export class RedisService {
  constructor(
    @Inject('RedisRepository')
    private readonly redisRepository: RedisRepository,
  ) {}

  async saveLink(bitlyLink: any): Promise<void> {
    await this.redisRepository.saveCache(
      'bitly',
      bitlyLink.id,
      JSON.stringify(bitlyLink),
    );

    const teste = await this.redisRepository.get('bitly', bitlyLink.id);
    console.log(teste);
  }

  async getLink(id: string): Promise<any> {
    const link = await this.redisRepository.get('bitly', id);
    return JSON.parse(link);
  }

  async removeCached(prefix: string, key: string): Promise<void> {
    await this.redisRepository.remove(prefix, key);

    const teste = await this.redisRepository.get(prefix, key);
    console.log(teste, 'Ver se deletou');
  }
}
