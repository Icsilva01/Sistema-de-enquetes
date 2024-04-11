import { faker } from "@faker-js/faker";
import { FieldValidationSpy } from "../test";
import { ValidationComposite } from "./validation-composite";

type SutTypes = {
  sut: ValidationComposite;
  fieldValidationSpies: FieldValidationSpy[];
};

const makeSut = (fieldName: string): SutTypes => {
  const fieldValidationsSpy = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName),
  ];
  const sut = new ValidationComposite(fieldValidationsSpy);
  return {
    sut,
    fieldValidationSpies: fieldValidationsSpy,
  };
};

describe("ValidationComposite", () => {
  test("Should return erro if any validation fails", () => {
    const fieldName = faker.database.column();
    const { sut, fieldValidationSpies } = makeSut(fieldName);
    const errorMessage = faker.lorem.words();
    fieldValidationSpies[0].error = new Error(errorMessage);
    fieldValidationSpies[1].error = new Error(faker.lorem.words());
    const error = sut.validate(fieldName, faker.lorem.words());
    expect(error).toBe(errorMessage);
  });

  test("Should return falsy if any validation fails", () => {
    const fieldName = faker.database.column();
    const { sut } = makeSut(fieldName);
    const error = sut.validate(fieldName, faker.lorem.words());
    expect(error).toBeFalsy();
  });
});
