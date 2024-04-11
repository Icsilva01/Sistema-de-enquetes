import { Validation } from "@/presentation/protocols/validation";
import { fieldValidation } from "@/validation/protocols/field-validation";

export class ValidationComposite implements Validation {
  constructor(private readonly validations: fieldValidation[]) {}

  validate(fieldName: string, fieldValue: string): string {
   const validations = this.validations.filter(v => v.fieldName === fieldName)
   for (const validation of validations) {
     const error = validation.validate(fieldValue)
     if (error) {
       return error.message
     }
     }
    return null;
  }
}