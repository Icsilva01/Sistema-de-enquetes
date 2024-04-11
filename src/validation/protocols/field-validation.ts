export interface fieldValidation {
  fieldName: string;
  validate(fieldValue: string): Error;
}