import { AuthenticationSpy, ValidationStub } from "@/presentation/test";
import { faker } from "@faker-js/faker";
import {
  RenderResult,
  cleanup,
  fireEvent,
  render,
} from "@testing-library/react";
import React from "react";
import Login from "./login";

type SutTypes = {
  sut: RenderResult;
  authenticationSpy: AuthenticationSpy;
};
type SutParams = {
  validationError: string;
};

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  const authenticationSpy = new AuthenticationSpy();
  validationStub.errorMessage = params?.validationError;
  const sut = render(
    <Login validation={validationStub} authentication={authenticationSpy} />
  );
  return {
    sut,
    authenticationSpy,
  };
};

const populateEmailField = (
  sut: RenderResult,
  email = faker.internet.email()
): void => {
  const emailInput = sut.getByTestId("email");
  fireEvent.input(emailInput, {
    target: { value: email },
  });
};

const populatePasswordField = (
  sut: RenderResult,
  password = faker.internet.password()
): void => {
  const passwordInput = sut.getByTestId("password");
  fireEvent.input(passwordInput, {
    target: { value: password },
  });
};

const simulateValidSubmit = (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password()
): void => {
  populateEmailField(sut, email);
  populatePasswordField(sut, password);
  const submitButton = sut.getByTestId("submit");
  fireEvent.click(submitButton);
};

const simulateStatusField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string
): void => {
  const emailStatus = sut.getByTestId(
    `${fieldName}-status`
  ) as HTMLInputElement;
  expect(emailStatus.title).toBe(validationError || "ok");
  expect(emailStatus.textContent).toBe(validationError ? "🔴" : "🟢");
};

describe("Login component", () => {
  afterEach(cleanup);
  test("Should start with initial state", () => {
    const validationError = faker.lorem.words();
    const { sut } = makeSut({ validationError });
    const errorWrap = sut.getByTestId("error-wrap");
    expect(errorWrap.childElementCount).toBe(0);
    const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);
    simulateStatusField(sut, "email", validationError);
    simulateStatusField(sut, "password", validationError);
  });

  test("Should show email error if Validation fails", () => {
    const validationError = faker.lorem.words();
    const { sut } = makeSut({ validationError });
    populateEmailField(sut);
    simulateStatusField(sut, "email", validationError);
  });

  test("Should show password error if Validation fails", () => {
    const validationError = faker.lorem.words();
    const { sut } = makeSut({ validationError });
    populatePasswordField(sut);
    simulateStatusField(sut, "password", validationError);
  });
  test("Should show valid password state if validation succeds", () => {
    const { sut } = makeSut();
    populatePasswordField(sut);
    simulateStatusField(sut, "password");
  });
  test("Should show valid email state if validation succeds", () => {
    const { sut } = makeSut();
    populateEmailField(sut);
    simulateStatusField(sut, "email");
  });
  test("Should enable submit button if form is valid", () => {
    const { sut } = makeSut();
    populateEmailField(sut);
    populatePasswordField(sut);
    const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
    expect(submitButton.disabled).toBe(false);
  });
  test("Should show spinner on submit", () => {
    const { sut } = makeSut();
    simulateValidSubmit(sut);
    const spinner = sut.getByTestId("spinner");
    expect(spinner).toBeTruthy();
  });
  test("Should call authentication with correct values", () => {
    const { sut, authenticationSpy } = makeSut();
    const email = faker.internet.email();
    const password = faker.internet.password();
    simulateValidSubmit(sut, email, password);
    expect(authenticationSpy.params).toEqual({
      email,
      password,
    });
  });
});
