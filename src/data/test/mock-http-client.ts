import { HttpPostClient, HttpPostParams, HttpStatusCode, httpResponse } from "@/data/protocols/http"


export class HttpPostClientSpy<T, R> implements HttpPostClient<T, R> {
  // O T é o tipo do body que será enviado
  // O R é o tipo da resposta que será recebido
  url?: string;
  body?: T;
  response: httpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async post(params: HttpPostParams<T>): Promise<httpResponse<R>> {
    this.url = params.url
    this.body = params.body
    return Promise.resolve(this.response)
  }
}