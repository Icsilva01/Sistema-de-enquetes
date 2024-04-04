import React, { useContext } from "react";
import Styles from "./form-status-styles.scss";
import { Spinner } from "..";
import formContext from "@/presentation/components/contexts/form/form-context";

const FormStatus: React.FC = () => {
  const { state } = useContext(formContext);
  const { isLoading, mainError } = state;
  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {isLoading && <Spinner className={Styles.spinner} />}
      {mainError && <span className={Styles.error}>{mainError}</span>}
    </div>
  );
};

export default FormStatus;
