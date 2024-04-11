import { requiredFieldError } from "@/validation/errors";
import { fieldValidation } from "@/validation/protocols/field-validation";



export class RequiredFieldValidation implements fieldValidation {
  constructor(readonly fieldName: string) {}
  validate(fieldValue: string): Error {
    return fieldValue ? null : new requiredFieldError();
  }
}