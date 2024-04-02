import React, { memo } from "react";
import Styles from "./login-header-styles.scss";
import Logo from "../logo/logo";


const LoginHeader: React.FC = () => {
  return (
    <header className={Styles.header}>
      <Logo className={Styles.headerImg} />
    </header>
  );
};

export default memo(LoginHeader)
