import { faker } from "@faker-js/faker";
import "jest-localstorage-mock";
import { LocalStorageAdapter } from "./local-storage-adapter";

const makeSut = (): LocalStorageAdapter => {
  return new LocalStorageAdapter();
}

describe("LocalStorageAdapter", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("Shoudl call localStorage with correct values", async () => {
    const sut = makeSut();
    const key = faker.database.column();
    const value = faker.lorem.word();
    await sut.set(key, value);
    expect(localStorage.setItem).toHaveBeenCalledWith(key, value);
  });
});
