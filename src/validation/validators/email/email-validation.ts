import { InvalidFieldError } from "@/validation/errors";
import { fieldValidation } from "@/validation/protocols/field-validation";

export class EmailValidation implements fieldValidation{
  constructor(readonly fieldName: string) {}
    validate(fieldValue: string): Error{
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return (!fieldValue || emailRegex.test(fieldValue)) ? null : new InvalidFieldError()
    }
  }