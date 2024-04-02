import {LoginFooter, BackgroundImg, FormStatus, Input, LoginHeader} from "@/presentation/components";
import React from "react";
import Styles from "./login-styles.scss";

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <LoginHeader />
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
      <LoginFooter />
    </div>
  );
};

export default Login;
