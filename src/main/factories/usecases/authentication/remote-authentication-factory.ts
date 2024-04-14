import { RemoteAutentication } from "@/data/usecases/autentication/remote-autentication"
import { Autentication } from "@/domain/usecases"
import { makeApiUrl } from "@/main/factories/http/api-url-factory"
import { makeAxiosHttpClient } from "@/main/factories/http/axios-http-client-factory"

export const makeRemoteAuthentication= (): Autentication => {
  return new RemoteAutentication(makeApiUrl(), makeAxiosHttpClient())
}