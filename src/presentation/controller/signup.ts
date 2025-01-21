import { HttpRequest } from '../http/request';
import { HttpResponse } from '../http/response';

export class SignupController {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'email', 'password'];
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return {
            statusCode: 400,
            body: new Error(`Missing param: ${field}`),
          };
        }
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: new Error('Internal server error'),
      };
    }
  }
}
