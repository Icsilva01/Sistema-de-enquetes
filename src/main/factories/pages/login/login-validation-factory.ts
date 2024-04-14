import { EmailValidation, MinLengthValidation, RequiredFieldValidation, ValidationComposite } from "@/validation/validators"

export const makeLoginValidation = (): ValidationComposite => {
  const validationComposite = new ValidationComposite([
    new RequiredFieldValidation('email'),
    new EmailValidation('email'),
    new RequiredFieldValidation('password'),
    new MinLengthValidation('password', 5)
  ])
  return validationComposite
}