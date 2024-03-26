import { HttpStatusCode } from "@/data/protocols/http/http-response";
import { HttpPostClientSpy } from "@/data/test/mock-http-client";
import { InvalidCredentialsError } from "@/domain/errors/invalid-credentials-error";
import { UnexpectedError } from "@/domain/errors/unexpectedError";
import { AccountModel } from "@/domain/models/account-models";
import {
  mockAccountModel,
  mockAuthentication,
} from "@/domain/test/mock-account";
import { AutenticationParams } from "@/domain/usecases/autentication";
import { faker } from "@faker-js/faker";
import { RemoteAutentication } from "./remote-autentication";

type SutTypes = {
  sut: RemoteAutentication;
  httpPostClientSpy: HttpPostClientSpy<AutenticationParams, AccountModel>;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<
    AutenticationParams,
    AccountModel
  >();
  const sut = new RemoteAutentication(url, httpPostClientSpy);
  return {
    sut,
    httpPostClientSpy,
  };
};

describe("RemoteAutentication", () => {
  test("Should call HttpPostClient with correct URL", async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientSpy } = makeSut(url);
    await sut.auth(mockAuthentication());
    expect(httpPostClientSpy.url).toBe(url);
  });
  test("Should call HttpPostClient with correct body", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const authenticationParams = mockAuthentication();
    await sut.auth(authenticationParams);
    expect(httpPostClientSpy.body).toEqual(authenticationParams);
  });
  test("Should throw InvalidCredencialsError if HttpPostClient returns 401", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized,
    };
    const promisse = sut.auth(mockAuthentication());
    await expect(promisse).rejects.toThrow(new InvalidCredentialsError());
  });
  test("Should throw UnexpectedError if HttpPostClient returns 400", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };
    const promisse = sut.auth(mockAuthentication());
    await expect(promisse).rejects.toThrow(new UnexpectedError());
  });
  test("Should throw UnexpectedError if HttpPostClient returns 500", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };
    const promisse = sut.auth(mockAuthentication());
    await expect(promisse).rejects.toThrow(new UnexpectedError());
  });
  test("Should throw UnexpectedError if HttpPostClient returns 404", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promisse = sut.auth(mockAuthentication());
    await expect(promisse).rejects.toThrow(new UnexpectedError());
  });
  test("Should return an AccountModel if HttpPosClient returns 200", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    //foi criado o mockAccountModel com o faker um accessToken que é o que irá retornar no body
    const httpResult = mockAccountModel();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    };
    const account = await sut.auth(mockAuthentication());
    // É esperado que o account seja igual ao httpResult
    expect(account).toEqual(httpResult);
  });
});
