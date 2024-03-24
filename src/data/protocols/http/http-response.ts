export enum HttpStatusCode {
  noContent = 204,
  unauthorized = 401
}

export type httpResponse = {
  statusCode: HttpStatusCode;
  body?: any
}