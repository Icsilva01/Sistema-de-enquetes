import React, { memo } from "react";
import Styles from "./login-footer-styles.scss";

type Props = React.HTMLAttributes<HTMLElement>;

const LoginFooter: React.FC = () => {
  return <footer className={Styles.footer} />;
};

export default memo(LoginFooter);

