import { InvalidCredentialsError } from "@/domain/errors";
import { AuthenticationSpy, SaveAccessTokenMock, ValidationStub } from "@/presentation/test";
import { faker } from "@faker-js/faker";
import {
  RenderResult,
  cleanup,
  fireEvent,
  render,
  waitFor,
} from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import { Login } from "@/presentation/pages";

type SutTypes = {
  sut: RenderResult;
  authenticationSpy: AuthenticationSpy;
  saveAccessTokenMock: SaveAccessTokenMock;
};
type SutParams = {
  validationError: string;
};

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => history,
  useLocation: () => history.location,
}));

const history = createMemoryHistory({ initialEntries: ["/login"] });

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  const authenticationSpy = new AuthenticationSpy();
  const saveAccessTokenMock = new SaveAccessTokenMock();
  validationStub.errorMessage = params?.validationError;
  const sut = render(
    <Router history={history}>
      <Login 
      validation={validationStub} 
      authentication={authenticationSpy}
      saveAccessToken={saveAccessTokenMock}
      />
    </Router>
  );
  return {
    sut,
    authenticationSpy,
    saveAccessTokenMock,
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

const simulateValidSubmit = async (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  populateEmailField(sut, email);
  populatePasswordField(sut, password);
  const form = sut.getByTestId("form");
  fireEvent.submit(form);
  await waitFor(() => form);
};

const testStatusField = (
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

const testErrorWrapChildCount = (
  sut: RenderResult,
  count: number
): void => {
  const errorWrap = sut.getByTestId("error-wrap");
  expect(errorWrap.childElementCount).toBe(count);
};

const testElementExist = (
  sut: RenderResult,
  fieldName: string
): void => {
  const el = sut.getByTestId(fieldName);
  expect(el).toBeTruthy();
};
const testElementText = (
  sut: RenderResult,
  fieldName: string,
  text: string
): void => {
  const el = sut.getByTestId(fieldName);
  expect(el.textContent).toBe(text);
};
const testButtonIsDisable = (
  sut: RenderResult,
  fieldName: string,
  isDisabled: boolean
): void => {
  const button = sut.getByTestId(fieldName) as HTMLButtonElement;
    expect(button.disabled).toBe(isDisabled);
};

describe("Login component", () => {
  afterEach(cleanup);
  test("Should start with initial state", () => {
    const validationError = faker.lorem.words();
    const { sut } = makeSut({ validationError });
    testErrorWrapChildCount(sut, 0);
    testButtonIsDisable(sut, "submit", true);
    testStatusField(sut, "email", validationError);
    testStatusField(sut, "password", validationError);
  });

  test("Should show email error if Validation fails", () => {
    const validationError = faker.lorem.words();
    const { sut } = makeSut({ validationError });
    populateEmailField(sut);
    testStatusField(sut, "email", validationError);
  });

  test("Should show password error if Validation fails", () => {
    const validationError = faker.lorem.words();
    const { sut } = makeSut({ validationError });
    populatePasswordField(sut);
    testStatusField(sut, "password", validationError);
  });
  test("Should show valid password state if validation succeds", () => {
    const { sut } = makeSut();
    populatePasswordField(sut);
    testStatusField(sut, "password");
  });
  test("Should show valid email state if validation succeds", () => {
    const { sut } = makeSut();
    populateEmailField(sut);
    testStatusField(sut, "email");
  });
  test("Should enable submit button if form is valid", () => {
    const { sut } = makeSut();
    populateEmailField(sut);
    populatePasswordField(sut);
    testButtonIsDisable(sut, "submit", false);
  });
  test("Should show spinner on submit", async () => {
    const { sut } = makeSut();
    await simulateValidSubmit(sut);
    testElementExist(sut, "spinner");
  });
  test("Should call authentication with correct values", async () => {
    const { sut, authenticationSpy } = makeSut();
    const email = faker.internet.email();
    const password = faker.internet.password();
    await simulateValidSubmit(sut, email, password);
    expect(authenticationSpy.params).toEqual({
      email,
      password,
    });
  });
  test("Should call authentication only once", async () => {
    const { sut, authenticationSpy } = makeSut();
    await simulateValidSubmit(sut);
    await simulateValidSubmit(sut);
    expect(authenticationSpy.callsCount).toBe(1);
  });
  test("Should not call authentication if form is invalid", async () => {
    const validationError = faker.lorem.words();
    const { sut, authenticationSpy } = makeSut({ validationError });
    await simulateValidSubmit(sut)
    expect(authenticationSpy.callsCount).toBe(0);
  });
  test("Should present error if Authentication fails", async () => {
    const { sut, authenticationSpy } = makeSut();
    const error = new InvalidCredentialsError();
    jest
      .spyOn(authenticationSpy, "auth")
      .mockReturnValueOnce(Promise.reject(error));
    await simulateValidSubmit(sut);
    testElementText(sut, "main-error", error.message);
    testErrorWrapChildCount(sut, 1);
  });
  test("Should call SaveAccessToken on success", async () => {
    const { sut, authenticationSpy, saveAccessTokenMock } = makeSut();
    await simulateValidSubmit(sut);
    expect(saveAccessTokenMock.accessToken).toBe(authenticationSpy.account.accessToken);
    expect(history.location.pathname).toBe("/");
  });

  test("Should present error if SaveAccessToken fails", async () => {
    const { sut, saveAccessTokenMock } = makeSut();
    const error = new InvalidCredentialsError();
    jest
      .spyOn(saveAccessTokenMock, "save")
      .mockReturnValueOnce(Promise.reject(error));
    await simulateValidSubmit(sut);
    testElementText(sut, "main-error", error.message);
    testErrorWrapChildCount(sut, 1);
  });
  test("Should go to signup page", () => {
    const { sut } = makeSut();
    const register = sut.getByTestId("signup");
    fireEvent.click(register);
    expect(history.location.pathname).toBe("/signup");
  });
});
