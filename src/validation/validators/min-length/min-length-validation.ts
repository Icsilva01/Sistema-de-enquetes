import { InvalidFieldError } from "@/validation/errors";
import { fieldValidation } from "@/validation/protocols/field-validation";

export class MinLengthValidation implements fieldValidation {
  constructor(readonly fieldName: string, private readonly minLength: number) {}
  
    validate(fieldValue: string): Error{
    return fieldValue.length >= this.minLength ? null : new InvalidFieldError()
    }
  }  