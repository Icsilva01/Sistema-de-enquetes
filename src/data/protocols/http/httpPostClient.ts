import { httpResponse } from ".";

export type HttpPostParams<T> = {
  //quando chamar o HttpPostParams, terá que informar um tipo do body nesse caso, por isso o <T>
  url: string
  body?: T
}

export interface HttpPostClient<T, R> {
  //como o T já está sendo utliizado no HttpPostParams, é necessário chamar outro tipo no httpResponse, pois o body dele necessita de um outro tipo, por isso o <R>
  post(params: HttpPostParams<T>): Promise<httpResponse<R>>;
}