import { InvalidFieldError } from "@/validation/errors"
import { MinLengthValidation } from "./min-length-validation"
import { faker } from "@faker-js/faker"

const makeSut = (): MinLengthValidation => new MinLengthValidation(faker.database.column(), 5)

describe('MinLengthValidation', () => {
  test('Shoud return error if value is invalid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.string.alphanumeric(4))
    expect(error).toEqual(new InvalidFieldError())
  })
  test('Shoud return falsy if value is valid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.string.alphanumeric(5))
    expect(error).toBeFalsy()
  })
})