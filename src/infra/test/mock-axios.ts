import { faker } from "@faker-js/faker";
import axios from "axios";

export const mockHttpResponse = (): any => ({
    data: faker.helpers.objectEntry,
    status: faker.number,
})

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  //o jest.Mocked<typeof axios> é para fazer um cache do axios, para que possamos acessar os métodos do axios
  mockedAxios.post.mockResolvedValue(mockHttpResponse);
  return mockedAxios;
};
