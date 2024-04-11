import { fieldValidation } from "@/validation/protocols/field-validation";
import { requiredFieldError } from "../errors";



export class RequiredFieldValidation implements fieldValidation {
  constructor(readonly fieldName: string) {}
  validate(fieldValue: string): Error {
    return fieldValue ? null : new requiredFieldError();
  }
}