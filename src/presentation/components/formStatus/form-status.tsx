import React, { useContext } from "react";
import Styles from "./form-status-styles.scss";
import { Spinner } from "..";
import formContext from "@/presentation/components/contexts/form/form-context";

const FormStatus: React.FC = () => {
  const { state, errorState } = useContext(formContext);
  const { isLoading } = state;
  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {state.isLoading && <Spinner className={Styles.spinner} />}
      {errorState.main && <span className={Styles.error}>{errorState.main}</span>}
    </div>
  );
};

export default FormStatus;
