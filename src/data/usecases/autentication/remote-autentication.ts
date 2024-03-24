import { HttpPostClient } from "@/data/protocols/http/httpPostClient";
import { AutenticationParams } from "@/domain/usecases/autentication";

export class RemoteAutentication {
  constructor(
    private readonly url: string,
    private readonly HttpPostClient: HttpPostClient
  ) {}

  async auth(params: AutenticationParams): Promise<void> {
    await this.HttpPostClient.post({
      url: this.url,
      body: params
    });
  }
}