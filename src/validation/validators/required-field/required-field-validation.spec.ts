
import { faker } from "@faker-js/faker";
import { RequiredFieldValidation } from "./required-field-validation";
import { requiredFieldError } from "@/validation/errors";

const makeSut = (): RequiredFieldValidation => new RequiredFieldValidation(faker.database.column());

describe("RequiredFieldValidation", () => {
  test("Should return error if field is empty", () => {
    const sut = makeSut();
    const error = sut.validate("");
    expect(error).toEqual(new requiredFieldError());
  });
  test("Should return falsy if field is not empty", () => {
    const sut = makeSut();
    const error = sut.validate(faker.lorem.word());
    expect(error).toBeFalsy();
  });
});
