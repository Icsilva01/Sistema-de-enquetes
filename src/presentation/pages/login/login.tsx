import {
  BackgroundImg,
  FormStatus,
  Input,
  LoginFooter,
  LoginHeader,
} from "@/presentation/components";
import React, { useState, useEffect } from "react";
import Styles from "./login-styles.scss";
import formContext from "@/presentation/components/contexts/form/form-context";
import { Validation } from "@/presentation/protocols/validation";

type Props = {
  validation: Validation;
};

const Login: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    email: "",
    password: "",
    emailError: "Campo obrigatório",
    passwordError: "Campo obrigatório",
    mainError: "",
  });

  useEffect(() => {
    validation.validate({ email: state.email });
  }, [state.email]);

  useEffect(() => {
    validation.validate({ password: state.password });
  }, [state.password]);

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <formContext.Provider value={{ state, setState }}>
        <div className={Styles.boxForm}>
          <form className={Styles.form}>
            <h2>Bem vindo a sua plataforma de enquetes!</h2>
            <p>E-mail</p>
            <Input type="email" name="email" placeholder="Digite seu e-mail" />
            <p>Senha</p>
            <Input
              type="password"
              name="password"
              placeholder="Digite sua senha"
            />
            <button
              data-testid="submit"
              disabled
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
