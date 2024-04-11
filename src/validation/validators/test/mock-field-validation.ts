import { fieldValidation } from "@/validation/protocols/field-validation";

export class FieldValidationSpy implements fieldValidation {
  error: Error = null;
  constructor(readonly fieldName: string) {}

  validate(fieldValue: string): Error {
    return this.error;
  }
}