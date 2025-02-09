import validator from 'validator';
import { UrlValidator } from '../protocols/url-validator';

export class UrlValidatorAdapter implements UrlValidator {
  isValid(url: string): boolean {
    return validator.isURL(url, { require_protocol: true });
  }
}
