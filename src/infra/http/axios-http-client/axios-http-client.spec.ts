import { AxiosHttpClient } from "./axios-http-client";
import axios from 'axios'
import { faker } from "@faker-js/faker";

jest.mock('axios')
//dessa forma mockamos a biblioteda do axios, para que não seja feita uma requisição real
const mockedAxios = axios as jest.Mocked<typeof axios>
//o jest.Mocked<typeof axios> é para fazer um cache do axios, para que possamos acessar os métodos do axios

const makeSut = (): AxiosHttpClient => {
return new AxiosHttpClient()
}

describe('AxiosHttpClient', () => {
  test('Should call Axios with correct URL', async () => {
    const url = faker.internet.url()
    const sut = makeSut()
    await sut.post({ url })
    expect(mockedAxios).toHaveBeenCalledWith(url)
  });
})