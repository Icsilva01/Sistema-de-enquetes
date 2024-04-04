import React, { useContext } from "react";
import Styles from "./form-status-styles.scss";
import { Spinner } from "..";
import formContext from "@/presentation/components/contexts/form/form-context";

const FormStatus: React.FC = () => {
  const { isLoading, errorMessage } = useContext(formContext);
  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {isLoading && <Spinner className={Styles.spinner} />}
      {errorMessage && <span className={Styles.error}>errorMessage</span>}
    </div>
  );
};

export default FormStatus;
