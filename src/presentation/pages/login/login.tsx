import { Autentication } from "@/domain/usecases";
import {
  BackgroundImg,
  FormStatus,
  Input,
  LoginFooter,
  LoginHeader,
} from "@/presentation/components";
import formContext from "@/presentation/components/contexts/form/form-context";
import { Validation } from "@/presentation/protocols/validation";
import React, { useEffect, useState } from "react";
import Styles from "./login-styles.scss";

type Props = {
  validation: Validation;
  authentication: Autentication
};

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
    mainError: "",
  });

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate("email", state.email),
      passwordError: validation.validate("password", state.password),
    });
  }, [state.email, state.password]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement> ):Promise<void> => {
    event.preventDefault()
    setState({...state, isLoading: true})
    await authentication.auth({
      email:state.email,
      password:state.password
    })
  }

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <formContext.Provider value={{ state, setState }}>
        <div className={Styles.boxForm}>
          <form className={Styles.form} onSubmit={handleSubmit}>
            <h2>Bem vindo a sua plataforma de enquetes!</h2>
            <p>E-mail</p>
            <Input type="email" name="email" placeholder="Digite seu e-mail" />
            <p>Senha</p>
            <Input type="password" name="password" placeholder="Digite sua senha" />
            <button
              data-testid="submit"
              disabled={!!state.emailError || !!state.passwordError}
              className={Styles.submit}
              type="submit"
            >
              Login
            </button>
            <span className={Styles.link}> Criar conta</span>
            <FormStatus />
          </form>
          <BackgroundImg className={Styles.formImg} />
        </div>
      </formContext.Provider>
      <LoginFooter />
    </div>
  );
};

export default Login;
