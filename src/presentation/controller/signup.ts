export class SignupController {
  handle(httpRequest: any): any {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
      };
    }

    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
      };
    }
  }
}
