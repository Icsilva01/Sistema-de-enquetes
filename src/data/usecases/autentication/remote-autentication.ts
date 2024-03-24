import { HttpPostClient } from "data/protocols/http/httpPostClient";

export class RemoteAutentication {
  constructor(
    private readonly url: string,
    private readonly HttpPostClient: HttpPostClient
  ) {}

  async auth(): Promise<void> {
    await this.HttpPostClient.post({
      url: this.url
    });
  }
}