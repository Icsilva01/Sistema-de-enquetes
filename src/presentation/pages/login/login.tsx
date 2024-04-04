import {
  BackgroundImg,
  FormStatus,
  Input,
  LoginFooter,
  LoginHeader,
} from "@/presentation/components";
import React, { useState } from "react";
import Styles from "./login-styles.scss";
import formContext from "@/presentation/components/contexts/form/form-context";

type StateProps = {
  isLoading: boolean,
  errorMessage: string,
};

const Login: React.FC = () => {
  const [state] = useState<StateProps>({
    isLoading: false,
    errorMessage: "",
  });
  return (
    <div className={Styles.login}>
      <LoginHeader />
      <formContext.Provider value={state}>
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
            <button className={Styles.submit} type="submit">
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
