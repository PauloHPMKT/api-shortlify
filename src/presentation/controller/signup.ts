export class SignupController {
  handle(httpRequest: any): any {
    const requiredFields = ['name', 'email'];
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return {
          statusCode: 400,
        };
      }
    }
  }
}
