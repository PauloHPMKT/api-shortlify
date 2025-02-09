import { SetCacheRepository } from '../../data/protocols/shorten/set-cache-repository';
import { GenerateShortenLinkUseCase } from '../../data/usecases/genarate-shorten/generate-shorten';
import { BitlyService } from '../../infra/bitly/bitly-service';
import { GenerateShortenLinkController } from '../../presentation/controller/shorten/generate';
import { Controller } from '../../presentation/protocols';
import { EmailValidatorAdapter } from '../../presentation/utils/email-validator-adapter';
import { UrlValidatorAdapter } from '../../presentation/utils/url-validator-adapter';

class RedisService implements SetCacheRepository {
  async set(key: string, value: string): Promise<void> {
    //console.log(key, value);
  }
}

export const makeGenarateShortenLinkController = (): Controller => {
  const shortenLinkService = new BitlyService();
  const cacheRepository = new RedisService();
  const emailValidatorAdapter = new UrlValidatorAdapter();
  const createShortenLink = new GenerateShortenLinkUseCase(
    shortenLinkService,
    cacheRepository,
  );
  return new GenerateShortenLinkController(
    emailValidatorAdapter,
    createShortenLink,
  );
};
