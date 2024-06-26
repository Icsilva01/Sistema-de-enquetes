import {
  EmailValidation,
  MinLengthValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from "@/validation/validators";
import { makeLoginValidation } from "./login-validation-factory";

describe("LoginValidationFactory", () => {
  test("Should compose validationComposite with correct validations", () => {
    const composite = makeLoginValidation();
    expect(composite).toEqual(
      new ValidationComposite([
        new RequiredFieldValidation("email"),
        new EmailValidation("email"),
        new RequiredFieldValidation("password"),
        new MinLengthValidation("password", 5),
      ])
    );
  });
});
