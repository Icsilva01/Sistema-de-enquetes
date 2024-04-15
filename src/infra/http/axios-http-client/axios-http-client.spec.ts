import { mockPostRequest } from "@/data/test";
import { mockAxios, mockHttpResponse } from "@/infra/test";
import axios from "axios";
import { AxiosHttpClient } from "./axios-http-client";

jest.mock("axios");
//dessa forma mockamos a biblioteda do axios, para que não seja feita uma requisição real

type SutTypes = {
  sut: AxiosHttpClient;
  mockedAxios: jest.Mocked<typeof axios>;
};

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient();
  const mockedAxios = mockAxios();
  return {
    sut,
    mockedAxios,
  };
};

describe("AxiosHttpClient", () => {
  test("Should call Axios with correct values", async () => {
    const request = mockPostRequest();
    const { sut, mockedAxios } = makeSut();
    await sut.post(request);
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
    // o .post vai garantir que iremos chamar o método post do axios na url correta
  });
  test("Should return correct statusCode and body", () => {
    const { sut, mockedAxios } = makeSut();
    const promisse = sut.post(mockPostRequest());
    expect(promisse).toEqual(mockedAxios.post.mock.results[0].value);
    //o results[0] é o do mockResolvedValue e o [1] seria o do mockRejectedValue. como não temos um mockRejectedValue, não precisamos dele
  });
  test("Should return correct statusCode and body on failure", () => {
    const { sut, mockedAxios } = makeSut();
    mockedAxios.post.mockRejectedValueOnce({
      response: mockHttpResponse(),
    });
    const promisse = sut.post(mockPostRequest());
    expect(promisse).toEqual(mockedAxios.post.mock.results[0].value);
  });
});
