import { HttpStatusCode, HttpPostClient } from "@/data/protocols/http";
import { InvalidCredentialsError, UnexpectedError } from "@/domain/errors";
import { Autentication, AutenticationParams } from "@/domain/usecases";
import { AccountModel } from "@/domain/models/account-models";

export class RemoteAutentication implements Autentication{
  constructor(
    private readonly url: string,
    //AutencticationParams é o tipo do parâmetro que será enviado
    //AccountModel é o tipo do retorno do body que será recebido
    private readonly HttpPostClient: HttpPostClient<AutenticationParams, AccountModel>
  ) {}

  async auth(params: AutenticationParams): Promise<AccountModel> {
    //o auth tem que retornar um AccountModel, por isso foi colocado dentro do Promise ao invés de void
    const httpResponse = await this.HttpPostClient.post({
      url: this.url,
      body: params,
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body;
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError();
      default:
        throw new UnexpectedError();
    }
  }
}
