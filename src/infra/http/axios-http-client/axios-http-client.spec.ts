import { AxiosHttpClient } from "./axios-http-client";
import axios from 'axios'
import { faker } from "@faker-js/faker";
import { HttpPostParams } from "@/data/protocols/http";

jest.mock('axios')
//dessa forma mockamos a biblioteda do axios, para que não seja feita uma requisição real
const mockedAxios = axios as jest.Mocked<typeof axios>
//o jest.Mocked<typeof axios> é para fazer um cache do axios, para que possamos acessar os métodos do axios

const makeSut = (): AxiosHttpClient => {
return new AxiosHttpClient()
}

const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.helpers.objectEntry
})

describe('AxiosHttpClient', () => {
  test('Should call Axios with correct URL and verb', async () => {
    const request = mockPostRequest()
    const sut = makeSut()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url)
    // o .post vai garantir que iremos chamar o método post do axios na url correta
  });
  // test('Should call Axios with correct body', async () => {
  //   const sut = makeSut()
  //   await sut.post({ url: faker.internet.url() })
  //   expect(mockedAxios.post).toHaveBeenCalledWith(url)
    // o .post vai garantir que iremos chamar o método post do axios na url correta
  // });
})