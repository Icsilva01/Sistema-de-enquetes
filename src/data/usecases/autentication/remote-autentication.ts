import { HttpStatusCode } from "@/data/protocols/http/http-response";
import { HttpPostClient } from "@/data/protocols/http/httpPostClient";
import { InvalidCredentialsError } from "@/domain/errors/invalid-credentials-error";
import { UnexpectedError } from "@/domain/errors/unexpectedError";
import { AccountModel } from "@/domain/models/account-models";
import { AutenticationParams } from "@/domain/usecases/autentication";

export class RemoteAutentication {
  constructor(
    private readonly url: string,
    //AutencticationParams é o tipo do parâmetro que será enviado
    //AccountModel é o tipo do retorno do body que será recebido
    private readonly HttpPostClient: HttpPostClient<AutenticationParams, AccountModel>
  ) {}

  async auth(params: AutenticationParams): Promise<void> {
    const httpResponse = await this.HttpPostClient.post({
      url: this.url,
      body: params,
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        break;
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError();
      default:
        throw new UnexpectedError();
    }
  }
}
