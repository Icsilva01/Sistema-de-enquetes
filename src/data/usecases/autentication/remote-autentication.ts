import { HttpPostClient } from "@/data/protocols/http/httpPostClient";
import { InvalidCredentialsError } from "@/domain/errors/invalid-credentials-error";
import { AutenticationParams } from "@/domain/usecases/autentication";

export class RemoteAutentication {
  constructor(
    private readonly url: string,
    private readonly HttpPostClient: HttpPostClient
  ) {}

  async auth(params: AutenticationParams): Promise<void> {
    const httpResponse = await this.HttpPostClient.post({
      url: this.url,
      body: params
    });
    switch (httpResponse.statusCode) {
      case 401:
        throw new InvalidCredentialsError()
      default:
        return Promise.resolve()
    }
  }
}