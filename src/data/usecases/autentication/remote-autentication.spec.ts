import { mockAuthentication } from "@/domain/test/mock-autentication"
import { HttpPostClientSpy } from "@/data/test/mock-http-client"
import { RemoteAutentication } from "./remote-autentication"
import { faker } from '@faker-js/faker'
import { InvalidCredentialsError } from "@/domain/errors/invalid-credentials-error"
import { HttpStatusCode } from "@/data/protocols/http/http-response"
import { UnexpectedError } from "@/domain/errors/unexpectedError"

type SutTypes = {
  sut:RemoteAutentication
  httpPostClientSpy: HttpPostClientSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy()
  const sut = new RemoteAutentication(url, httpPostClientSpy)
  return{
    sut,
    httpPostClientSpy
  }
}

describe("RemoteAutentication", () => {
  test("Should call HttpPostClient with correct URL", async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    await sut.auth(mockAuthentication())
    expect(httpPostClientSpy.url).toBe(url)
  })
  test("Should call HttpPostClient with correct body", async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const authenticationParams = mockAuthentication()
    await sut.auth(authenticationParams)
    expect(httpPostClientSpy.body).toEqual(authenticationParams)
  })
  test("Should throw InvalidCredencialsError if HttpPostClient returns 401", async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized
    }
    const promisse = sut.auth(mockAuthentication())
    await expect(promisse).rejects.toThrow(new InvalidCredentialsError())
  })
  test("Should throw UnexpectedError if HttpPostClient returns 400", async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const promisse = sut.auth(mockAuthentication())
    await expect(promisse).rejects.toThrow(new UnexpectedError())
  })
  test("Should throw UnexpectedError if HttpPostClient returns 500", async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promisse = sut.auth(mockAuthentication())
    await expect(promisse).rejects.toThrow(new UnexpectedError())
  })
  test("Should throw UnexpectedError if HttpPostClient returns 404", async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promisse = sut.auth(mockAuthentication())
    await expect(promisse).rejects.toThrow(new UnexpectedError())
  })
})
