import { HttpPostClientSpy } from "data/test/mock-http-client";
import { RemoteAutentication } from "./remote-autentication";

type SutTypes = {
  sut:RemoteAutentication
  httpPostClientSpy: HttpPostClientSpy
}

const makeSut = (url: string = 'any_url'): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy();
  const sut = new RemoteAutentication(url, httpPostClientSpy);
  return{
    sut,
    httpPostClientSpy
  }
}

describe("RemoteAutentication", () => {
  test("Should call HttpPostClient with correct URL", async () => {
    const url = "other_url";
    const { sut, httpPostClientSpy } = makeSut(url);
    await sut.auth();
    expect(httpPostClientSpy.url).toBe(url);
  });
});
