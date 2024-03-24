import { HttpPostClientSpy } from "../../test/mock-http-client"
import { RemoteAutentication } from "./remote-autentication"
import { faker } from '@faker-js/faker'

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
    await sut.auth()
    expect(httpPostClientSpy.url).toBe(url)
  })
})
